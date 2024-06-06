import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { VisitaDetailState } from '../../../../shared/models/entidades/estados/visitadetailstate.model';


// Selector para obtener el estado de los detalles de la visita
export const selectVisitaDetailFeature = (state: AppState) => state.visitaPorId;

// Selector para obtener la visita actualmente seleccionada
export const selectedVisitaSelector = createSelector(
    selectVisitaDetailFeature,
    (state: VisitaDetailState) => state.visitaPorId
);

export const selectCargando = createSelector(
    selectVisitaDetailFeature,
    (state: VisitaDetailState) => state.cargando
);

export const selectErrorMessage = createSelector(
    selectVisitaDetailFeature,
    (state: VisitaDetailState) => state.errorMessage
);

export const selectErrorCarga = createSelector(
    selectVisitaDetailFeature,
    (state: VisitaDetailState) => state.errorCarga
);

export const selectShowCrearErrorModal = createSelector(
    selectVisitaDetailFeature,
    (state: VisitaDetailState) => state.showCrearErrorModal
);

export const selectShowCrearSuccessModal = createSelector(
    selectVisitaDetailFeature,
    (state: VisitaDetailState) => state.showCrearSuccessModal
);

export const selectShowEditarErrorModal = createSelector(
    selectVisitaDetailFeature,
    (state: VisitaDetailState) => state.showEditarErrorModal
);

export const selectShowEditarSuccessModal = createSelector(
    selectVisitaDetailFeature,
    (state: VisitaDetailState) => state.showEditarSuccessModal
);