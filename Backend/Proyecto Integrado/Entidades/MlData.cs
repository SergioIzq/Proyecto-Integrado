using Microsoft.ML.Data;

namespace Proyecto_Integrado.Entidades
{
    public class RegressionData
    {
        public string CorreoPaciente { get; set; }
        public string CorreoMedico { get; set; }
        public DateTime FechaVisita { get; set; }
        public int PacienteId { get; set; }
        public int MedicoId { get; set; }
        public int EnfermedadId { get; set; }
        public string EnfermedadNombre { get; set; }
        public float MedicamentoId { get; set; }
        public string MedicamentoNombre { get; set; }

    }

    public class RegressionAllData
    {
        public string CorreoPaciente { get; set; }
        public string CorreoMedico { get; set; }
        public DateTime FechaVisita { get; set; }
        public int PacienteId { get; set; }
        public int MedicoId { get; set; }
        public int EnfermedadId { get; set; }
        public string EnfermedadNombre { get; set; }                
    }

    public class RegressionPrediction
    {
        public float MedicamentoId { get; set; }
    }

    public class PredictionRegressionResult
    {
        public string MedicamentoNombre { get; set; }

        public float MedicamentoId { get; set; }
        public double MeanSquaredError { get; set; }
        public double MeanAbsoluteError { get; set; }
        public double ErrorPercentage { get; set; }
    }


    public class ClusterData
    {
        [LoadColumn(0)]
        public string CorreoPaciente { get; set; }

        [LoadColumn(1)]
        public string CorreoMedico { get; set; }

        [LoadColumn(2)]
        public DateTime FechaVisita { get; set; }

        [LoadColumn(3)]
        public int PacienteId { get; set; }

        [LoadColumn(4)]
        public int MedicoId { get; set; }

        [LoadColumn(5)]
        public int EnfermedadId { get; set; }

        [LoadColumn(6)]
        public string EnfermedadNombre { get; set; }

        [LoadColumn(7)]
        public float MedicamentoId { get; set; }

        [LoadColumn(8)]
        public string MedicamentoNombre { get; set; }
    }

    public class ClusterPredictionResult
    {
        [ColumnName("PredictedLabel")]
        public uint PredictedClusterId;

        [ColumnName("Score")]
        public float[] Distances;

        public double DaviesBouldinIndex;
    }

    public class RecommendationData
    {
        public int PacienteId { get; set; }
        public int MedicoId { get; set; }
        public int EnfermedadId { get; set; }
        public int MedicamentoId { get; set; }
        public string EnfermedadNombre { get; set; }
        public string CorreoPaciente { get; set; }
        public string CorreoMedico { get; set; }
        public string MedicamentoNombre { get; set; }
        public DateTime FechaVisita { get; set; }
        public float Label { get; set; }
    }

    public class RecommendationPredictionResult
    {
        public float Score { get; set; }
        public double MeanSquaredError { get; set; }
        public double MeanAbsoluteError { get; set; }
        public double RSquared { get; set; }
    }

    public class MedicamentoDTO
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
    }
}
