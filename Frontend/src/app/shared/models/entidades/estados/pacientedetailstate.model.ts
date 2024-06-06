import { Paciente } from "../paciente.model";

export interface PacienteDetailState {
    cargando: boolean;
    errorCarga: boolean;
    pacientePorId: Paciente | null;
    showCrearErrorModal: boolean;
    showCrearSuccessModal: boolean;
    showEditarErrorModal: boolean;
    showEditarSuccessModal: boolean;
    errorMessage: string;
}