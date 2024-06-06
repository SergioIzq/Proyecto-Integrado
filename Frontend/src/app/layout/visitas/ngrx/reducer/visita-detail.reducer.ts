import { createReducer, on } from "@ngrx/store";
import { VisitaDetailState } from "src/app/shared/models/entidades/estados/visitadetailstate.model";
import * as VisitaDetailActions from '../actions/visita-detail.actions'

export const estadoInicial: VisitaDetailState = { cargando: false, visitaPorId: null, errorCarga: false, showCrearErrorModal: false, showCrearSuccessModal: false, showEditarErrorModal: false, showEditarSuccessModal: false, errorMessage: '' };

const visitaDetailReducer = createReducer(
    estadoInicial,
    on(VisitaDetailActions.GetVisita, (state) => ({
        ...state,
        cargando: true,
        errorCarga: false
    })),
    on(VisitaDetailActions.GetVisitaSuccess, (state, { visita }) => ({
        ...state,
        cargando: false,
        visitaPorId: visita,
        errorCarga: false
    })),
    on(VisitaDetailActions.GetVisitaFail, (state) => ({
        ...state,
        cargando: false,
        visitaPorId: null,
        errorCarga: true
    })),
    on(VisitaDetailActions.CreateVisita, (state) => ({
        ...state,
        cargando: true,
    })),
    on(VisitaDetailActions.CreateVisitaSuccess, (state) => ({
        ...state,
        cargando: false,
        showCrearSuccessModal: true
    })),
    on(VisitaDetailActions.CreateVisitaFailure, (state, action) => ({
        ...state,
        cargando: false,
        showCrearErrorModal: true,
        errorMessage: action.errorMessage
    })),
    on(VisitaDetailActions.UpdateVisita, (state) => ({
        ...state,
        cargando: true,
    })),
    on(VisitaDetailActions.UpdateVisitaSuccess, (state) => ({
        ...state,
        cargando: false,
        showEditarSuccessModal: true
    })),
    on(VisitaDetailActions.UpdateVisitaFailure, (state, action) => ({
        ...state,
        cargando: false,
        showEditarErrorModal: true,
        errorMessage: action.errorMessage
    })),
    on(VisitaDetailActions.CloseModal, (state) => ({
        ...state,
        cargando: false,
        showCrearSuccessModal: false,
        showEditarSuccessModal:false,
        showCrearErrorModal: false,
        showEditarErrorModal: false
    })),
    on(VisitaDetailActions.CreateVisitaSintomaEnfermedad, (state) => ({
        ...state,
        cargando: true,
    })),
    on(VisitaDetailActions.CreateVisitaSintomaEnfermedadSuccess, (state) => ({
        ...state,
        cargando: false,
        showCrearSuccessModal: true
    })),
    on(VisitaDetailActions.CreateVisitaSintomaEnfermedadFailure, (state, action) => ({
        ...state,
        cargando: false,
        showCrearErrorModal: true,
        errorMessage: action.errorMessage
    }))
);

export function VisitaDetailReducer(state: VisitaDetailState = estadoInicial, action: any): VisitaDetailState {
    return visitaDetailReducer(state, action);
}
