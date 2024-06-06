import { createReducer, on } from "@ngrx/store";
import * as VisitasListActions from 'src/app/layout/visitas/ngrx/actions/visitas-list.actions'
import { Visita } from "src/app/shared/models/entidades/visita.model";
import { EntidadListState } from "src/app/shared/models/entidades/estados/visitasListState.model";
import { Paciente } from "src/app/shared/models/entidades/paciente.model";

export const estadoInicial: EntidadListState<Paciente> = { cargando: false, lista: [], errorCarga: false, showErrorModal: false, showSuccessModal: false, errorMessage: '' };

export const visitasListReducer = createReducer(
    estadoInicial,
    on(VisitasListActions.LoadingVisitas, (state) => {
        return {
            ...state,
            cargando: true,
        }
    }),
    on(VisitasListActions.LoadingVisitasSuccess, (state, { listaVisitas }) => {
        return {
            ...state,
            cargando: false,
            lista: listaVisitas
        };
    }),
    on(VisitasListActions.LoadingVisitasFailure, (state) => {
        return {
            ...state,
            cargando: false,
            errorCarga: true
        };
    }),
    on(VisitasListActions.DeleteVisitaSuccess, (state) => {
        return {
            ...state,
            cargando: false,
            showSuccessModal: true
        };
    }),
    on(VisitasListActions.DeleteVisitaFail, (state, action) => {
        return {
            ...state,
            cargando: false,
            showErrorModal: true,
            errorMessage: action.errorMessage
        };
    }),
    on(VisitasListActions.CloseModal, (state) => ({
        ...state,
        cargando: false,
        showErrorModal: false,
        showSuccessModal: false
    }))
)
