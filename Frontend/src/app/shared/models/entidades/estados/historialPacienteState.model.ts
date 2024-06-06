import { Paciente } from "../paciente.model";

export interface HistorialPacienteState {
    cargando: boolean;
    paciente: Paciente | null;
    errorCarga: boolean;
    userId: number;
    errorMessage: string;
}
