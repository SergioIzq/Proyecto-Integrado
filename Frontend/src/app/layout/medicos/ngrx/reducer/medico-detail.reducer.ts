import { createReducer, on } from "@ngrx/store";
import { MedicoDetailState } from "src/app/shared/models/entidades/estados/medicodetailstate.model";
import * as MedicoDetailActions from '../actions/medico-detail.actions'

export const estadoInicial: MedicoDetailState = { cargando: false, medicoPorId: null, errorCarga: false, showCrearErrorModal: false, showCrearSuccessModal: false, showEditarErrorModal: false, showEditarSuccessModal: false, errorMessage: '' };

const medicoDetailReducer = createReducer(
    estadoInicial,
    on(MedicoDetailActions.GetMedico, (state) => ({
        ...state,
        cargando: true,
        errorCarga: false
    })),
    on(MedicoDetailActions.GetMedicoSuccess, (state, { medico }) => ({
        ...state,
        cargando: false,
        medicoPorId: medico,
        errorCarga: false
    })),
    on(MedicoDetailActions.GetMedicoFail, (state) => ({
        ...state,
        cargando: false,
        medicoPorId: null,
        errorCarga: true
    })),
    on(MedicoDetailActions.CreateMedico, (state) => ({
        ...state,
        cargando: true,
    })),
    on(MedicoDetailActions.CreateMedicoSuccess, (state) => ({
        ...state,
        cargando: false,
        showCrearSuccessModal: true
    })),
    on(MedicoDetailActions.CreateMedicoFailure, (state) => ({
        ...state,
        cargando: false,
        showCrearErrorModal: true
    })),
    on(MedicoDetailActions.UpdateMedico, (state) => ({
        ...state,
        cargando: true,
    })),
    on(MedicoDetailActions.UpdateMedicoSuccess, (state) => ({
        ...state,
        cargando: false,
        showEditarSuccessModal: true
    })),
    on(MedicoDetailActions.UpdateMedicoFailure, (state, action) => ({
        ...state,
        cargando: false,
        showEditarErrorModal: true,
        errorMessage: action.errorMessage
    })),
    on(MedicoDetailActions.CloseErrorModal, (state) => ({
        ...state,
        cargando: false,
        showCrearErrorModal: false,
        showEditarErrorModal: false
    })),
    on(MedicoDetailActions.CloseSuccessModal, (state) => ({
        ...state,
        cargando: false,
        showCrearSuccessModal: false,
        showEditarSuccessModal: false
    }))
);

export function MedicoDetailReducer(state: MedicoDetailState = estadoInicial, action: any): MedicoDetailState {
    return medicoDetailReducer(state, action);
}
