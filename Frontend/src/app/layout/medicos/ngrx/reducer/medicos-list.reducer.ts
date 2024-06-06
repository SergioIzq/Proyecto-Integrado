import { createReducer, on } from "@ngrx/store";
import * as MedicosListActions from '../actions/medicos-list.actions'
import { EntidadListState } from "src/app/shared/models/entidades/estados/visitasListState.model";
import { Medico } from "src/app/shared/models/entidades/medico.model";

export const estadoInicial: EntidadListState<Medico> = { cargando: false, lista: [], errorCarga: false, showErrorModal: false, showSuccessModal: false, errorMessage: '' };

export const MedicosListReducer = createReducer(
    estadoInicial,
    on(MedicosListActions.LoadingMedicos, (state) => {
        return {
            ...state,
            cargando: true,
        }
    }),
    on(MedicosListActions.LoadingMedicosSuccess, (state, { listaMedicos }) => {
        return {
            ...state,
            cargando: false,
            lista: listaMedicos
        };
    }),
    on(MedicosListActions.LoadingMedicosFailure, (state) => {
        return {
            ...state,
            cargando: false,
            errorCarga: true
        };
    }),
    on(MedicosListActions.DeleteMedicoSuccess, (state) => {
        return {
            ...state,
            cargando: false,
            showSuccessModal: true
        };
    }),
    on(MedicosListActions.DeleteMedicoFailure, (state, action) => {
        return {
            ...state,
            cargando: false,
            showErrorModal: true,
            errorMessage: action.errorMessage
        };
    }),
    on(MedicosListActions.CloseModal, (state) => ({
        ...state,
        cargando: false,
        showErrorModal: false,
        showSuccessModal: false
    }))
)