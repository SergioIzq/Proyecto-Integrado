using Microsoft.AspNetCore.Mvc;
using NHibernate;
using Proyecto_Integrado.Entidades.BBDD;
using Microsoft.ML;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Proyecto_Integrado.Entidades;
using Proyecto_Integrado.Services;
using System.Text.Json.Serialization;
using System.Text.Json;

namespace Proyecto_Integrado.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MLRegressionController : ControllerBase
    {
        private readonly ISessionFactory _sessionFactory;
        private ITransformer _model;
        private readonly MLContext _mlContext;
        private readonly JsonSerializerOptions _jsonSerializerOptions;
        private readonly IDataLoadingService _dataLoadingService;        

        public MLRegressionController(ISessionFactory sessionFactory, IDataLoadingService dataLoadingService)
        {
            _mlContext = new MLContext();
            _sessionFactory = sessionFactory;
            _dataLoadingService = dataLoadingService;
            // Configurar opciones de serialización JSON
            _jsonSerializerOptions = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                NumberHandling = JsonNumberHandling.AllowNamedFloatingPointLiterals
            };

            // Suscribirse al evento de datos cargados
            _dataLoadingService.DataLoaded += async (sender, e) => await LoadModelAsync();

        }

        private async Task LoadModelAsync()
        {
            _model = _dataLoadingService.GetTrainedModel();            
        }        

        [HttpPost("predictForMedicamentos")]
        public IActionResult PredictForMedicamentos([FromBody] RegressionAllData inputData)
        {
            try
            {
                LoadModelAsync();
                var lista = _dataLoadingService.GetRegressionData();
                // Verificar si hay al menos 10 visitas
                if (lista.Count < 10)
                {
                    throw new Exception("Se necesitan mínimo 10 visitas para usar la predicción.");
                }

                // Obtener la lista de medicamentos con sus IDs y nombres
                var medicamentos = GetAllMedicamentos();

                var session = _sessionFactory.OpenSession();
                var predictor = _mlContext.Model.CreatePredictionEngine<RegressionData, RegressionPrediction>(_model);

                var predictions = new List<PredictionRegressionResult>();

                // Obtener el máximo valor de errorPercentage
                var maxErrorPercentage = double.MinValue;

                foreach (var medicamento in medicamentos)
                {
                    var medicamentoData = new RegressionData
                    {
                        FechaVisita = inputData.FechaVisita,
                        PacienteId = inputData.PacienteId,
                        MedicoId = inputData.MedicoId,
                        EnfermedadId = inputData.EnfermedadId,
                        EnfermedadNombre = inputData.EnfermedadNombre,
                        MedicamentoId = medicamento.Id,
                        CorreoMedico = inputData.CorreoMedico,
                        CorreoPaciente = inputData.CorreoPaciente,
                        MedicamentoNombre = medicamento.Nombre
                    };

                    var testData = _mlContext.Data.LoadFromEnumerable(new List<RegressionData> { medicamentoData });
                    var predictionsTest = _model.Transform(testData);
                    var metrics = _mlContext.Regression.Evaluate(predictionsTest, labelColumnName: "Label");

                    // Calcular el porcentaje de error basado en MAE y MSE
                    var meanAbsoluteError = metrics.MeanAbsoluteError;
                    var meanSquaredError = metrics.MeanSquaredError;

                    // Fórmula simple de porcentaje de error (esto es un ejemplo y puede ajustarse según sea necesario)
                    var errorPercentage = ((meanAbsoluteError + Math.Sqrt(meanSquaredError)) / 2) / Math.Sqrt(2) * 100;

                    // Actualizar el máximo valor de errorPercentage
                    if (errorPercentage > maxErrorPercentage)
                    {
                        maxErrorPercentage = errorPercentage;
                    }

                    predictions.Add(new PredictionRegressionResult
                    {
                        MedicamentoNombre = medicamento.Nombre,
                        MedicamentoId = medicamento.Id,
                        MeanSquaredError = meanSquaredError,
                        MeanAbsoluteError = meanAbsoluteError,
                        ErrorPercentage = errorPercentage
                    });
                }

                // Normalizar los valores de errorPercentage para que estén en el rango de 0 a 100
                foreach (var prediction in predictions)
                {
                    prediction.ErrorPercentage = Math.Round(prediction.ErrorPercentage / maxErrorPercentage * 100, 2);
                }

                // Ordenar las predicciones por ErrorPercentage de menor a mayor
                var sortedPredictions = predictions
                    .OrderBy(p => p.ErrorPercentage)
                    .ToList();

                // Serializar la respuesta usando las opciones de serialización JSON configuradas
                var sortedPredictionsJson = JsonSerializer.Serialize(sortedPredictions, _jsonSerializerOptions);

                return Content(sortedPredictionsJson, "application/json");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error en la petición: {ex.Message}");
            }
        }

        private List<MedicamentoDTO> GetAllMedicamentos()
        {
            try
            {
                using (var session = _sessionFactory.OpenSession())
                {
                    var entities = session.QueryOver<Medicamento>()
                                          .List();

                    // Crear una lista de objetos MedicamentoDTO con Id y Nombre
                    var medicamentos = entities.Select(x => new MedicamentoDTO { Id = x.Id, Nombre = x.Nombre }).ToList();

                    return medicamentos;
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la petición: " + ex.Message);
            }
        }
    }
}
