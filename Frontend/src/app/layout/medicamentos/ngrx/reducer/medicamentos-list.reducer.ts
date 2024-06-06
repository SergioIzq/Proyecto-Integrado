import { createReducer, on } from "@ngrx/store";
import * as MedicamentosListActions from '../actions/medicamentos-list.actions'
import { EntidadListState } from "src/app/shared/models/entidades/estados/visitasListState.model";
import { Medicamento } from "src/app/shared/models/entidades/medicamento.model";

export const estadoInicial: EntidadListState<Medicamento> = { cargando: false, lista: [], errorCarga: false, showErrorModal: false, showSuccessModal: false, errorMessage: '' };

export const medicamentosListReducer = createReducer(
    estadoInicial,
    on(MedicamentosListActions.LoadingMedicamentos, (state) => {
        return {
            ...state,
            cargando: true,
        }
    }),
    on(MedicamentosListActions.LoadingMedicamentosSuccess, (state, { listaMedicamentos }) => {
        return {
            ...state,
            cargando: false,
            lista: listaMedicamentos
        };
    }),
    on(MedicamentosListActions.LoadingMedicamentosFailure, (state) => {
        return {
            ...state,
            cargando: false,
            errorCarga: true
        };
    }),
)