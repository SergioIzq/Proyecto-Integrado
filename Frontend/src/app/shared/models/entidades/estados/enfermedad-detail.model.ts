import { Enfermedad } from "../enfermedad.model";

export interface EnfermedadDetailState {
    cargando: boolean;
    errorCarga: boolean;
    enfermedadPorId: Enfermedad | null;
    showCrearErrorModal: boolean;
    showCrearSuccessModal: boolean;
    showEditarErrorModal: boolean;
    showEditarSuccessModal: boolean;
    errorMessage: string;
}