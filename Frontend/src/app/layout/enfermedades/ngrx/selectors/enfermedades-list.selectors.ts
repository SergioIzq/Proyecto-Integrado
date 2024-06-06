import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import { EntidadListState } from "src/app/shared/models/entidades/estados/visitasListState.model";
import { Enfermedad } from "src/app/shared/models/entidades/enfermedad.model";

export const selectEnfermedadesFeature = (state: AppState) => state.listaEnfermedades

export const selectEnfermedadesList = createSelector(
    selectEnfermedadesFeature,
    (state: EntidadListState<Enfermedad>) => state.lista
);

export const selectCargando = createSelector(
    selectEnfermedadesFeature,
    (state: EntidadListState<Enfermedad>) => state.cargando
);

export const selectErrorCarga = createSelector(
    selectEnfermedadesFeature,
    (state: EntidadListState<Enfermedad>) => state.errorCarga
);

export const selectShowErrorModal = createSelector(
    selectEnfermedadesFeature,
    (state: EntidadListState<Enfermedad>) => state.showErrorModal
);

export const selectShowSuccessModal = createSelector(
    selectEnfermedadesFeature,
    (state: EntidadListState<Enfermedad>) => state.showSuccessModal
);

export const selectErrorMessage = createSelector(
    selectEnfermedadesFeature,
    (state: EntidadListState<Enfermedad>) => state.errorMessage
);