import { createAction, props } from '@ngrx/store';
import { Enfermedad } from 'src/app/shared/models/entidades/enfermedad.model';

export const LoadingEnfermedades = createAction('LoadingEnfermedades');

export const LoadingEnfermedadesSuccess = createAction('LoadingEnfermedadesSuccess', props<{ listaEnfermedades: Enfermedad[] }>());

export const LoadingEnfermedadesFailure = createAction('LoadingEnfermedadesFailure');

export const DeleteEnfermedad = createAction('DeleteEnfermedad', props<{ id: number }>());

export const DeleteEnfermedadSuccess = createAction('DeleteEnfermedadSuccess');

export const DeleteEnfermedadFailure = createAction('DeleteEnfermedadFailure', props<{ errorMessage: string }>());

export const CloseModal = createAction('CloseModal');