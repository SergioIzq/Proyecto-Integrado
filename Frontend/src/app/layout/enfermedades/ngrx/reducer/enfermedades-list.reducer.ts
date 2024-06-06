import { createReducer, on } from "@ngrx/store";
import * as EnfermedadesListActions from '../actions/enfermedades-list.actions'
import { EntidadListState } from "src/app/shared/models/entidades/estados/visitasListState.model";
import { Enfermedad } from "src/app/shared/models/entidades/enfermedad.model";

export const estadoInicial: EntidadListState<Enfermedad> = { cargando: false, lista: [], errorCarga: false, showErrorModal: false,showSuccessModal:false, errorMessage:'' };

export const enfermedadesListReducer = createReducer(
    estadoInicial,
    on(EnfermedadesListActions.LoadingEnfermedades, (state) => {
        return {
            ...state,
            cargando: true,
        }
    }),
    on(EnfermedadesListActions.LoadingEnfermedadesSuccess, (state, { listaEnfermedades }) => {
        return {
            ...state,
            cargando: false,
            lista: listaEnfermedades
        };
    }),
    on(EnfermedadesListActions.LoadingEnfermedadesFailure, (state) => {
        return {
            ...state,
            cargando: false,
            errorCarga: true
        };
    }),
    on(EnfermedadesListActions.DeleteEnfermedadSuccess, (state) => {
        return {
            ...state,
            cargando: false,
            showSuccessModal: true
        };
    }),
    on(EnfermedadesListActions.DeleteEnfermedadFailure, (state, action) => {
        return {
            ...state,
            cargando: false,
            showErrorModal: true,
            errorMessage: action.errorMessage
        };
    }),
    on(EnfermedadesListActions.CloseModal, (state) => ({
        ...state,
        cargando: false,
        showErrorModal: false,
        showSuccessModal: false
    }))
)