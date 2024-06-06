using Microsoft.AspNetCore.Mvc;
using NHibernate;
using Proyecto_Integrado.Entidades.BBDD;
using Microsoft.ML;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Xml.Linq;
using Proyecto_Integrado.Entidades;

namespace Proyecto_Integrado.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MLRecommendationController : ControllerBase
    {
        private readonly ISessionFactory _sessionFactory;
        private readonly ITransformer _model;
        private readonly MLContext _mlContext;
        private readonly JsonSerializerOptions _jsonSerializerOptions;

        public MLRecommendationController(ISessionFactory sessionFactory)
        {
            _sessionFactory = sessionFactory;

            _mlContext = new MLContext(seed: 0);

            // Configurar opciones de serialización JSON
            _jsonSerializerOptions = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                NumberHandling = JsonNumberHandling.AllowNamedFloatingPointLiterals
            };

            // Cargar el modelo
            var dataList = LoadData();
            var splitData = _mlContext.Data.TrainTestSplit(_mlContext.Data.LoadFromEnumerable(dataList), testFraction: 0.2);
            var trainingData = splitData.TrainSet;

            // Define el pipeline para recomendación
            var pipeline = _mlContext.Transforms.Conversion.MapValueToKey(outputColumnName: "PacienteIdEncoded", inputColumnName: "PacienteId")
                .Append(_mlContext.Transforms.Conversion.MapValueToKey(outputColumnName: "MedicamentoIdEncoded", inputColumnName: "MedicamentoId"))
                .Append(_mlContext.Recommendation().Trainers.MatrixFactorization(
                labelColumnName: "Label", // Usar la columna Label para la etiqueta
                matrixColumnIndexColumnName: "PacienteIdEncoded",
                matrixRowIndexColumnName: "MedicamentoIdEncoded"));

            _model = pipeline.Fit(trainingData);

        }

        [HttpPost("predict")]
        public ContentResult Predict([FromBody] RecommendationData inputData)
        {
            var predictor = _mlContext.Model.CreatePredictionEngine<RecommendationData, RecommendationPredictionResult>(_model);
            var prediction = predictor.Predict(inputData);


            // Calcular métricas de evaluación
            var testData = _mlContext.Data.LoadFromEnumerable(new List<RecommendationData> { inputData });
            var predictions = _model.Transform(testData);
            var metrics = _mlContext.Regression.Evaluate(predictions, labelColumnName: "Label");
            // Crear un objeto PredictionResult con los resultados
            var predictionResult = new RecommendationPredictionResult
            {
                Score = prediction.Score,
                MeanSquaredError = metrics.MeanSquaredError,
                MeanAbsoluteError = metrics.MeanAbsoluteError,
                RSquared = metrics.RSquared
            };

            // Serializar la respuesta usando las opciones de serialización JSON configuradas
            var predictionResultJson = JsonSerializer.Serialize(predictionResult, _jsonSerializerOptions);

            return Content(predictionResultJson, "application/json");
        }

        private List<RecommendationData> LoadData()
        {
            using (var session = _sessionFactory.OpenSession())
            {
                return session.Query<Visita>()
                    .Select(visita => new RecommendationData
                    {
                        FechaVisita = visita.FechaVisita,
                        PacienteId = visita.Paciente.Id,
                        MedicoId = visita.Medico.Id,
                        EnfermedadId = visita.Enfermedad.Id,
                        EnfermedadNombre = visita.Enfermedad.Nombre,
                        MedicamentoId = visita.Medicamento.Id,
                        CorreoMedico = visita.Paciente.CorreoElectronico,
                        CorreoPaciente = visita.Medico.CorreoElectronico,
                        MedicamentoNombre = visita.Medicamento.Nombre,                        
                    }).ToList();
            }
        }

    }
}