import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from 'src/app/shared/models/entidades/estados/authstate.model';
import { AppState } from 'src/app/app.state';

export const selectAuthFeature = (state: AppState) => state.auth

export const selectMostrarModalError = createSelector(
    selectAuthFeature,
    (state: AuthState) => state.mostrarModalError
);

export const selectErrorMessage = createSelector(
    selectAuthFeature,
    (state: AuthState) => state.errorMessage
);
