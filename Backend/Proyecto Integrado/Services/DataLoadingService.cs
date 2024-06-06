using Microsoft.ML;
using NHibernate;
using Proyecto_Integrado.Entidades.BBDD;
using Proyecto_Integrado.Entidades;


namespace Proyecto_Integrado.Services
{
    public interface IDataLoadingService
    {
        List<RegressionData> GetRegressionData();
        ITransformer GetTrainedModel();
        event EventHandler DataLoaded;
    }

    public class DataLoadingService : BackgroundService, IDataLoadingService
    {
        private readonly IServiceScopeFactory _serviceScopeFactory;
        private readonly TimeSpan _refreshInterval;
        private readonly MLContext _mlContext;
        private ITransformer _model;
        private List<RegressionData> _regressionData = new List<RegressionData>();
        private TaskCompletionSource<bool> _dataLoaded = new TaskCompletionSource<bool>();
        private readonly object _lock = new object();

        public event EventHandler DataLoaded;

        public DataLoadingService(IServiceScopeFactory serviceScopeFactory, TimeSpan refreshInterval)
        {
            _serviceScopeFactory = serviceScopeFactory;
            _refreshInterval = refreshInterval;
            _mlContext = new MLContext();
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                await LoadDataAsync();
                lock (_lock)
                {
                    _dataLoaded.TrySetResult(true); // Indicar que los datos han sido cargados
                    _dataLoaded = new TaskCompletionSource<bool>(); // Resetear el TaskCompletionSource para el siguiente uso
                }
                OnDataLoaded(); // Disparar el evento de datos cargados
                await Task.Delay(_refreshInterval, stoppingToken);
            }
        }

        private async Task LoadDataAsync()
        {
            using (var scope = _serviceScopeFactory.CreateScope())
            {
                var sessionFactory = scope.ServiceProvider.GetRequiredService<ISessionFactory>();

                using (var session = sessionFactory.OpenSession())
                {
                    var loadedData = session.Query<Visita>()
                        .Select(visita => new RegressionData
                        {
                            FechaVisita = visita.FechaVisita,
                            PacienteId = visita.Paciente.Id,
                            MedicoId = visita.Medico.Id,
                            EnfermedadId = visita.Enfermedad.Id,
                            EnfermedadNombre = visita.Enfermedad.Nombre,
                            MedicamentoId = visita.Medicamento.Id,
                            CorreoMedico = visita.Paciente.CorreoElectronico,
                            CorreoPaciente = visita.Medico.CorreoElectronico,
                            MedicamentoNombre = visita.Medicamento.Nombre
                        }).ToList();

                    lock (_lock)
                    {
                        _regressionData = loadedData;
                    }

                    // Entrenar el modelo
                    await TrainModelAsync();

                }
            }
        }

        private async Task TrainModelAsync()
        {
            if (_regressionData.Count > 0)
            {
                var dataView = _mlContext.Data.LoadFromEnumerable<RegressionData>(_regressionData);

                var splitData = _mlContext.Data.TrainTestSplit(dataView, testFraction: 0.2);
                var trainingData = splitData.TrainSet;

                var pipeline = _mlContext.Transforms.CopyColumns(outputColumnName: "Label", inputColumnName: "MedicamentoId")
                    .Append(_mlContext.Transforms.Categorical.OneHotEncoding(outputColumnName: "PacienteIdEncoded", inputColumnName: "PacienteId"))
                    .Append(_mlContext.Transforms.Categorical.OneHotEncoding(outputColumnName: "MedicoIdEncoded", inputColumnName: "MedicoId"))
                    .Append(_mlContext.Transforms.Text.FeaturizeText(outputColumnName: "EnfermedadNombreFeaturized", inputColumnName: "EnfermedadNombre"))
                    .Append(_mlContext.Transforms.Text.FeaturizeText(outputColumnName: "CorreoPacienteFeaturized", inputColumnName: "CorreoPaciente"))
                    .Append(_mlContext.Transforms.Text.FeaturizeText(outputColumnName: "CorreoMedicoFeaturized", inputColumnName: "CorreoMedico"))
                    .Append(_mlContext.Transforms.Categorical.OneHotEncoding(outputColumnName: "EnfermedadIdEncoded", inputColumnName: "EnfermedadId"))
                    .Append(_mlContext.Transforms.Concatenate("Features", "PacienteIdEncoded", "MedicoIdEncoded", "EnfermedadIdEncoded", "EnfermedadNombreFeaturized", "CorreoPacienteFeaturized", "CorreoMedicoFeaturized"))
                    .Append(_mlContext.Regression.Trainers.FastTree());               

                _model = pipeline.Fit(trainingData);
                
                await Task.CompletedTask;
            }
        }

        private void OnDataLoaded()
        {
            DataLoaded?.Invoke(this, EventArgs.Empty);
        }

        public List<RegressionData> GetRegressionData()
        {

            lock (_lock)
            {
                return new List<RegressionData>(_regressionData);
            }
        }

        public ITransformer GetTrainedModel()
        {
            return _model;
        }
    }
}
