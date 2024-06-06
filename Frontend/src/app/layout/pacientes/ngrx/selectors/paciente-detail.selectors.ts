import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { PacienteDetailState } from '../../../../shared/models/entidades/estados/pacientedetailstate.model';


export const selectPacienteDetailFeature = (state: AppState) => state.pacientePorId;

export const selectedPacienteSelector = createSelector(
    selectPacienteDetailFeature,
    (state: PacienteDetailState) => state.pacientePorId
);

export const selectCargando = createSelector(
    selectPacienteDetailFeature,
    (state: PacienteDetailState) => state.cargando
);

export const selectErrorCarga = createSelector(
    selectPacienteDetailFeature,
    (state: PacienteDetailState) => state.errorCarga
);

export const selectShowCrearErrorModal = createSelector(
    selectPacienteDetailFeature,
    (state: PacienteDetailState) => state.showCrearErrorModal
);

export const selectShowCrearSuccessModal = createSelector(
    selectPacienteDetailFeature,
    (state: PacienteDetailState) => state.showCrearSuccessModal
);

export const selectShowEditarErrorModal = createSelector(
    selectPacienteDetailFeature,
    (state: PacienteDetailState) => state.showEditarErrorModal
);

export const selectShowEditarSuccessModal = createSelector(
    selectPacienteDetailFeature,
    (state: PacienteDetailState) => state.showEditarSuccessModal
);

export const selectErrorMessage = createSelector(
    selectPacienteDetailFeature,
    (state: PacienteDetailState) => state.errorMessage
);