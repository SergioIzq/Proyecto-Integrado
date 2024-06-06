import { Visita } from "../visita.model";

export interface VisitaDetailState {
    cargando: boolean;
    errorCarga: boolean;    
    visitaPorId: Visita | null;
    errorMessage: string;
    showCrearErrorModal: boolean;
    showCrearSuccessModal: boolean;
    showEditarErrorModal: boolean;
    showEditarSuccessModal: boolean;
}