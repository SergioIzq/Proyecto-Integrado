import { Medico } from "../medico.model";

export interface MedicoDetailState {
    cargando: boolean;
    errorCarga: boolean;
    medicoPorId: Medico | null;
    showCrearErrorModal: boolean;
    showCrearSuccessModal: boolean;
    showEditarErrorModal: boolean;
    showEditarSuccessModal: boolean;
    errorMessage: string;
}