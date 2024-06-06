import { createReducer, on } from "@ngrx/store";
import * as PacientesListActions from '../actions/pacientes-list.actions'
import { EntidadListState } from "src/app/shared/models/entidades/estados/visitasListState.model";
import { Paciente } from "src/app/shared/models/entidades/paciente.model";

export const estadoInicial: EntidadListState<Paciente> = { cargando: false, lista: [], errorCarga: false, showErrorModal: false, showSuccessModal: false, errorMessage: '' };

export const pacientesListReducer = createReducer(
    estadoInicial,
    on(PacientesListActions.LoadingPacientes, (state) => {
        return {
            ...state,
            cargando: true,
        }
    }),
    on(PacientesListActions.LoadingPacientesSuccess, (state, { listaPacientes }) => {
        return {
            ...state,
            cargando: false,
            lista: listaPacientes
        };
    }),
    on(PacientesListActions.LoadingPacientesFailure, (state) => {
        return {
            ...state,
            cargando: false,
            errorCarga: true
        };
    }),
    on(PacientesListActions.DeletePacienteSuccess, (state) => {
        return {
            ...state,
            cargando: false,
            showSuccessModal: true
        };
    }),
    on(PacientesListActions.DeletePacienteFailure, (state, action) => {
        return {
            ...state,
            cargando: false,
            showErrorModal: true,
            errorMessage: action.errorMessage
        };
    }),
    on(PacientesListActions.CloseModal, (state) => ({
        ...state,
        cargando: false,
        showErrorModal: false,
        showSuccessModal: false
    }))
)