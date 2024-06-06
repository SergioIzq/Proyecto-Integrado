namespace Proyecto_Integrado.Entidades.BBDD
    {
    public class Visita
    {
        public virtual int Id { get; set; }
        public virtual Paciente Paciente { get; set; }
        public virtual Medico Medico { get; set; }
        public virtual Enfermedad Enfermedad { get; set; }
        public virtual Medicamento Medicamento { get; set; }
        public virtual DateTime FechaVisita { get; set; }
        public virtual string Motivo { get; set; }
        public virtual IList<VisitaSintomaEnfermedad> Sintomas { get; set; } = new List<VisitaSintomaEnfermedad>();

    }

}