using Microsoft.AspNetCore.Mvc;
using NHibernate;
using Proyecto_Integrado.Entidades.BBDD;
using Microsoft.ML;
using Proyecto_Integrado.Entidades;

namespace Proyecto_Integrado.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MLClusterController : ControllerBase
    {
        private readonly ISessionFactory _sessionFactory;
        private readonly ITransformer _model;
        private readonly MLContext _mlContext;

        public MLClusterController(ISessionFactory sessionFactory)
        {
            _sessionFactory = sessionFactory;

            _mlContext = new MLContext(seed: 0);

            // Cargar el modelo
            var dataList = LoadData();
            var splitData = _mlContext.Data.TrainTestSplit(_mlContext.Data.LoadFromEnumerable(dataList), testFraction: 0.2);
            var trainingData = splitData.TrainSet;

            var pipeline = _mlContext.Transforms.Categorical.OneHotEncoding(outputColumnName: "PacienteIdEncoded", inputColumnName: "PacienteId")
                .Append(_mlContext.Transforms.Categorical.OneHotEncoding(outputColumnName: "MedicoIdEncoded", inputColumnName: "MedicoId"))
                .Append(_mlContext.Transforms.Text.FeaturizeText(outputColumnName: "EnfermedadNombreFeaturized", inputColumnName: "EnfermedadNombre"))
                .Append(_mlContext.Transforms.Text.FeaturizeText(outputColumnName: "CorreoPacienteFeaturized", inputColumnName: "CorreoPaciente"))
                .Append(_mlContext.Transforms.Text.FeaturizeText(outputColumnName: "CorreoMedicoFeaturized", inputColumnName: "CorreoMedico"))
                .Append(_mlContext.Transforms.Categorical.OneHotEncoding(outputColumnName: "EnfermedadIdEncoded", inputColumnName: "EnfermedadId"))
                .Append(_mlContext.Transforms.Concatenate("Features", "PacienteIdEncoded", "MedicoIdEncoded", "EnfermedadIdEncoded"))
                .Append(_mlContext.Clustering.Trainers.KMeans(new Microsoft.ML.Trainers.KMeansTrainer.Options
                {
                    NumberOfClusters = 5,
                    FeatureColumnName = "Features"
                }));

            _model = pipeline.Fit(trainingData);
        }

        [HttpPost("predict")]

        public IActionResult Predict([FromBody] ClusterData inputData)
        {
            var predictor = _mlContext.Model.CreatePredictionEngine<ClusterData, ClusterPredictionResult>(_model);
            var prediction = predictor.Predict(inputData);

            return Ok(new
            {
                PredictedClusterId = prediction.PredictedClusterId,
                Distances = prediction.Distances,
                DaviesBouldinIndex = CalculateDaviesBouldinIndex()
            });
        }


        private double CalculateDaviesBouldinIndex()
        {            
            var dataList = LoadData();
            var testData = _mlContext.Data.LoadFromEnumerable(dataList);
            var predictions = _model.Transform(testData);
            var metrics = _mlContext.Clustering.Evaluate(predictions, featureColumnName: "Features");

            return metrics.DaviesBouldinIndex;
        }

        private List<ClusterData> LoadData()
        {
            using (var session = _sessionFactory.OpenSession())
            {
                return session.Query<Visita>()
                    .Select(visita => new ClusterData
                    {
                        FechaVisita = visita.FechaVisita,
                        PacienteId = visita.Paciente.Id,
                        MedicoId = visita.Medico.Id,
                        EnfermedadId = visita.Enfermedad.Id,
                        EnfermedadNombre = visita.Enfermedad.Nombre,
                        MedicamentoId = visita.Medicamento.Id,
                        CorreoMedico = visita.Paciente.CorreoElectronico,
                        CorreoPaciente = visita.Medico.CorreoElectronico,
                    }).ToList();
            }
        }
    }
}