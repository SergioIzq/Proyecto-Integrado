import { createReducer, on } from "@ngrx/store";
import { HistorialPacienteState } from "src/app/shared/models/entidades/estados/historialPacienteState.model";
import * as PacienteHistorialActions from '../actions/paciente-historial.actions'

export const estadoInicial: HistorialPacienteState = { cargando: false, paciente: null, errorCarga: false, errorMessage: '', userId: 0 };

const historialPacienteReducer = createReducer(
    estadoInicial,
    on(PacienteHistorialActions.GetUserIdSuccess, (state, action) => ({
        ...state,
        cargando: true,
        errorCarga: false,
        userId: action.id
    })),
    on(PacienteHistorialActions.GetPaciente, (state) => ({
        ...state,
        cargando: true,
        errorCarga: false,
    })),
    on(PacienteHistorialActions.GetPacienteSuccess, (state, { paciente }) => ({
        ...state,
        cargando: false,
        paciente: paciente,
        errorCarga: false
    })),
    on(PacienteHistorialActions.GetPacienteFailure, (state) => ({
        ...state,
        cargando: false,
        paciente: null,
        errorCarga: true
    })),
    
);

export function HistorialPacienteReducer(state: HistorialPacienteState = estadoInicial, action: any): HistorialPacienteState {
    return historialPacienteReducer(state, action);
}
