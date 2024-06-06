import { createReducer, on } from "@ngrx/store";
import * as EnfermedadDetailActions from '../actions/enfermedad-detail.actions'
import { EnfermedadDetailState } from '../../../../shared/models/entidades/estados/enfermedad-detail.model';

export const estadoInicial: EnfermedadDetailState = { cargando: false, enfermedadPorId: null, errorCarga: false, showCrearErrorModal: false, showCrearSuccessModal: false, showEditarErrorModal: false, showEditarSuccessModal: false, errorMessage: '' };

const enfermedadDetailReducer = createReducer(
    estadoInicial,
    on(EnfermedadDetailActions.GetEnfermedad, (state) => ({
        ...state,
        cargando: true,
        errorCarga: false
    })),
    on(EnfermedadDetailActions.GetEnfermedadSuccess, (state, { enfermedad }) => ({
        ...state,
        cargando: false,
        enfermedadPorId: enfermedad,
        errorCarga: false
    })),
    on(EnfermedadDetailActions.GetEnfermedadFail, (state) => ({
        ...state,
        cargando: false,
        enfermedadPorId: null,
        errorCarga: true
    })),
    on(EnfermedadDetailActions.CreateEnfermedad, (state) => ({
        ...state,
        cargando: true,
    })),
    on(EnfermedadDetailActions.CreateEnfermedadSuccess, (state) => ({
        ...state,
        cargando: false,
        showCrearSuccessModal: true
    })),
    on(EnfermedadDetailActions.CreateEnfermedadFailure, (state) => ({
        ...state,
        cargando: false,
        showCrearErrorModal: true
    })),
    on(EnfermedadDetailActions.UpdateEnfermedad, (state) => ({
        ...state,
        cargando: true,
    })),
    on(EnfermedadDetailActions.UpdateEnfermedadSuccess, (state) => ({
        ...state,
        cargando: false,
        showEditarSuccessModal: true
    })),
    on(EnfermedadDetailActions.UpdateEnfermedadFailure, (state, action) => ({
        ...state,
        cargando: false,
        showEditarErrorModal: true,
        errorMessage: action.errorMessage
    })),
    on(EnfermedadDetailActions.CloseModal, (state) => ({
        ...state,
        cargando: false,
        showCrearErrorModal: false,
        showEditarErrorModal: false,
        showCrearSuccessModal: false,
        showEditarSuccessModal: false
    })),

);

export function EnfermedadDetailReducer(state: EnfermedadDetailState = estadoInicial, action: any): EnfermedadDetailState {
    return enfermedadDetailReducer(state, action);
}
