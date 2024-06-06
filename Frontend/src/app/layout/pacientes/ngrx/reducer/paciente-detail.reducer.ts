import { createReducer, on } from "@ngrx/store";
import { PacienteDetailState } from "src/app/shared/models/entidades/estados/pacientedetailstate.model";
import * as PacienteDetailActions from '../actions/paciente-detail.actions'

export const estadoInicial: PacienteDetailState = { cargando: false, pacientePorId: null, errorCarga: false, showCrearErrorModal: false, showCrearSuccessModal: false, showEditarErrorModal: false, showEditarSuccessModal: false, errorMessage: '' };

const pacienteDetailReducer = createReducer(
    estadoInicial,
    on(PacienteDetailActions.GetPaciente, (state) => ({
        ...state,
        cargando: true,
        errorCarga: false
    })),
    on(PacienteDetailActions.GetPacienteSuccess, (state, { paciente }) => ({
        ...state,
        cargando: false,
        pacientePorId: paciente,
        errorCarga: false
    })),
    on(PacienteDetailActions.GetPacienteFail, (state) => ({
        ...state,
        cargando: false,
        pacientePorId: null,
        errorCarga: true
    })),
    on(PacienteDetailActions.CreatePaciente, (state) => ({
        ...state,
        cargando: true,
    })),
    on(PacienteDetailActions.CreatePacienteSuccess, (state) => ({
        ...state,
        cargando: false,
        showCrearSuccessModal: true
    })),
    on(PacienteDetailActions.CreatePacienteFailure, (state) => ({
        ...state,
        cargando: false,
        showCrearErrorModal: true
    })),
    on(PacienteDetailActions.UpdatePaciente, (state) => ({
        ...state,
        cargando: true,
    })),
    on(PacienteDetailActions.UpdatePacienteSuccess, (state) => ({
        ...state,
        cargando: false,
        showEditarSuccessModal: true
    })),
    on(PacienteDetailActions.UpdatePacienteFailure, (state, action) => ({
        ...state,
        cargando: false,
        showEditarErrorModal: true,
        errorMessage: action.errorMessage
    })),
    on(PacienteDetailActions.CloseErrorModal, (state) => ({
        ...state,
        cargando: false,
        showCrearErrorModal: false,
        showEditarErrorModal: false
    })),
    on(PacienteDetailActions.CloseSuccessModal, (state) => ({
        ...state,
        cargando: false,
        showCrearSuccessModal: false,
        showEditarSuccessModal: false
    }))
);

export function PacienteDetailReducer(state: PacienteDetailState = estadoInicial, action: any): PacienteDetailState {
    return pacienteDetailReducer(state, action);
}
