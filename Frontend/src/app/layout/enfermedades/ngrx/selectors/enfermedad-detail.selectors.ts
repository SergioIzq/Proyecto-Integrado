import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { EnfermedadDetailState } from 'src/app/shared/models/entidades/estados/enfermedad-detail.model';


export const selectEnfermedadDetailFeature = (state: AppState) => state.enfermedadPorId;

export const selectedEnfermedadSelector = createSelector(
    selectEnfermedadDetailFeature,
    (state: EnfermedadDetailState) => state.enfermedadPorId
);

export const selectCargando = createSelector(
    selectEnfermedadDetailFeature,
    (state: EnfermedadDetailState) => state.cargando
);

export const selectErrorCarga = createSelector(
    selectEnfermedadDetailFeature,
    (state: EnfermedadDetailState) => state.errorCarga
);

export const selectShowCrearErrorModal = createSelector(
    selectEnfermedadDetailFeature,
    (state: EnfermedadDetailState) => state.showCrearErrorModal
);

export const selectShowCrearSuccessModal = createSelector(
    selectEnfermedadDetailFeature,
    (state: EnfermedadDetailState) => state.showCrearSuccessModal
);

export const selectShowEditarErrorModal = createSelector(
    selectEnfermedadDetailFeature,
    (state: EnfermedadDetailState) => state.showEditarErrorModal
);

export const selectShowEditarSuccessModal = createSelector(
    selectEnfermedadDetailFeature,
    (state: EnfermedadDetailState) => state.showEditarSuccessModal
);

export const selectErrorMessage = createSelector(
    selectEnfermedadDetailFeature,
    (state: EnfermedadDetailState) => state.errorMessage
);