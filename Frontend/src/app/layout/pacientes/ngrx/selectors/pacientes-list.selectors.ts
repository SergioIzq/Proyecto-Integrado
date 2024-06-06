import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import { EntidadListState } from "src/app/shared/models/entidades/estados/visitasListState.model";
import { Paciente } from "src/app/shared/models/entidades/paciente.model";

export const selectPacientesFeature = (state: AppState) => state.lista

export const selectPacientesList = createSelector(
    selectPacientesFeature,
    (state: EntidadListState<any>) => state.lista
);

export const selectCargando = createSelector(
    selectPacientesFeature,
    (state: EntidadListState<Paciente>) => state.cargando
);

export const selectErrorCarga = createSelector(
    selectPacientesFeature,
    (state: EntidadListState<Paciente>) => state.errorCarga
);

export const selectShowErrorModal = createSelector(
    selectPacientesFeature,
    (state: EntidadListState<Paciente>) => state.showErrorModal
);

export const selectShowSuccessModal = createSelector(
    selectPacientesFeature,
    (state: EntidadListState<Paciente>) => state.showSuccessModal
);

export const selectErrorMessage = createSelector(
    selectPacientesFeature,
    (state: EntidadListState<Paciente>) => state.errorMessage
);