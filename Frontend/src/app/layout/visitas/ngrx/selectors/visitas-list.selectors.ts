import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import { EntidadListState } from "src/app/shared/models/entidades/estados/visitasListState.model";
import { Paciente } from "src/app/shared/models/entidades/paciente.model";

export const selectVisitasFeature = (state: AppState) => state.visitas

export const selectVisitasList = createSelector(
    selectVisitasFeature,
    (state: EntidadListState<any>) => state.lista
);

export const selectCargando = createSelector(
    selectVisitasFeature,
    (state: EntidadListState<Paciente>) => state.cargando
);

export const selectErrorCarga = createSelector(
    selectVisitasFeature,
    (state: EntidadListState<Paciente>) => state.errorCarga
);

export const selectErrorMessage = createSelector(
    selectVisitasFeature,
    (state: EntidadListState<Paciente>) => state.errorMessage
);

export const selectShowErrorModal = createSelector(
    selectVisitasFeature,
    (state: EntidadListState<Paciente>) => state.showErrorModal
);

export const selectShowSuccessModal = createSelector(
    selectVisitasFeature,
    (state: EntidadListState<Paciente>) => state.showSuccessModal
);