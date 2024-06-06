import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import { EntidadListState } from "src/app/shared/models/entidades/estados/visitasListState.model";
import { Medico } from "src/app/shared/models/entidades/medico.model";

export const selectMedicosFeature = (state: AppState) => state.listaMedicos

export const selectMedicosList = createSelector(
    selectMedicosFeature,
    (state: EntidadListState<any>) => state.lista
);

export const selectCargando = createSelector(
    selectMedicosFeature,
    (state: EntidadListState<Medico>) => state.cargando
);

export const selectErrorCarga = createSelector(
    selectMedicosFeature,
    (state: EntidadListState<Medico>) => state.errorCarga
);

export const selectShowErrorModal = createSelector(
    selectMedicosFeature,
    (state: EntidadListState<Medico>) => state.showErrorModal
);

export const selectShowSuccessModal = createSelector(
    selectMedicosFeature,
    (state: EntidadListState<Medico>) => state.showSuccessModal
);

export const selectErrorMessage = createSelector(
    selectMedicosFeature,
    (state: EntidadListState<Medico>) => state.errorMessage
);
