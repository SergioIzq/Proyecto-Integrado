import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { MedicoDetailState } from '../../../../shared/models/entidades/estados/medicodetailstate.model';


export const selectMedicoDetailFeature = (state: AppState) => state.medicoPorId;

export const selectedMedicoSelector = createSelector(
    selectMedicoDetailFeature,
    (state: MedicoDetailState) => state.medicoPorId
);

export const selectCargando = createSelector(
    selectMedicoDetailFeature,
    (state: MedicoDetailState) => state.cargando
);

export const selectErrorCarga = createSelector(
    selectMedicoDetailFeature,
    (state: MedicoDetailState) => state.errorCarga
);

export const selectShowCrearErrorModal = createSelector(
    selectMedicoDetailFeature,
    (state: MedicoDetailState) => state.showCrearErrorModal
);

export const selectShowCrearSuccessModal = createSelector(
    selectMedicoDetailFeature,
    (state: MedicoDetailState) => state.showCrearSuccessModal
);

export const selectShowEditarErrorModal = createSelector(
    selectMedicoDetailFeature,
    (state: MedicoDetailState) => state.showEditarErrorModal
);

export const selectShowEditarSuccessModal = createSelector(
    selectMedicoDetailFeature,
    (state: MedicoDetailState) => state.showEditarSuccessModal
);

export const selectErrorMessage = createSelector(
    selectMedicoDetailFeature,
    (state: MedicoDetailState) => state.errorMessage
);