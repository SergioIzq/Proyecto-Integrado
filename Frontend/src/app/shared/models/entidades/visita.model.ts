import { Paciente } from "./paciente.model";
import { Enfermedad } from "./enfermedad.model";
import { Medicamento } from "./medicamento.model";
import { Medico } from './medico.model';
import { VisitaSintomaEnfermedad } from "./visitaSintomaEnfermedad.model";

export class Visita {
    public Id!: number;
    public Paciente!: Paciente;
    public Medico!: Medico;
    public Enfermedad!: Enfermedad;
    public Medicamento!: Medicamento;
    public Motivo!: string;
    public FechaVisita!: Date; 
    public Sintomas!: VisitaSintomaEnfermedad[];
}

