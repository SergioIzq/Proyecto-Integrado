import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import { EntidadListState } from "src/app/shared/models/entidades/estados/visitasListState.model";
import { Medicamento } from "src/app/shared/models/entidades/medicamento.model";

export const selectMedicamentosFeature = (state: AppState) => state.listaMedicamentos

export const selectMedicamentosList = createSelector(
    selectMedicamentosFeature,
    (state: EntidadListState<Medicamento>) => state.lista
);

export const selectCargando = createSelector(
    selectMedicamentosFeature,
    (state: EntidadListState<Medicamento>) => state.cargando
);

export const selectErrorCarga = createSelector(
    selectMedicamentosFeature,
    (state: EntidadListState<Medicamento>) => state.errorCarga
);
