import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { HistorialPacienteState } from 'src/app/shared/models/entidades/estados/historialPacienteState.model';


export const selectHistorialPacienteFeature = (state: AppState) => state.paciente;

export const selectedPacienteSelector = createSelector(
    selectHistorialPacienteFeature,
    (state: HistorialPacienteState) => state.paciente
);

export const userIdSelector = createSelector(
    selectHistorialPacienteFeature,
    (state: HistorialPacienteState) => state.userId
);

export const selectCargando = createSelector(
    selectHistorialPacienteFeature,
    (state: HistorialPacienteState) => state.cargando
);

export const selectErrorMessage = createSelector(
    selectHistorialPacienteFeature,
    (state: HistorialPacienteState) => state.errorMessage
);

export const selectErrorCarga = createSelector(
    selectHistorialPacienteFeature,
    (state: HistorialPacienteState) => state.errorCarga
);