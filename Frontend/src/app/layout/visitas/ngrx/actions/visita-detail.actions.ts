import { createAction, props } from '@ngrx/store';
import { Visita } from 'src/app/shared/models/entidades/visita.model';

export const GetVisita = createAction('GetVisita', props<{ id: number }>())

export const GetVisitaSuccess = createAction('GetVisitaSuccess', props<{ visita: Visita }>())

export const GetVisitaFail = createAction('GetVisitaFail')

export const UpdateVisita = createAction('UpdateVisita', props<{ visita: Partial<Visita>, visitaSintomaEnfermedad: any }>());

export const UpdateVisitaFailure = createAction('UpdateVisitaFailure', props<{ errorMessage: string }>());

export const UpdateVisitaSuccess = createAction('UpdateVisitaSuccess');

export const CreateVisita = createAction('CreateVisita', props<{ payload: any, visitaSintomaEnfermedad: any }>());

export const CreateVisitaSuccess = createAction('CreateVisitaSuccess');

export const CreateVisitaFailure = createAction('CreateVisitaFailure', props<{ errorMessage: string }>());

export const CloseModal = createAction('CloseModal');

export const CreateVisitaSintomaEnfermedad = createAction('CreateVisitaSintomaEnfermedad', props<{ visitaSintomaEnfermedad: any }>());

export const CreateVisitaSintomaEnfermedadSuccess = createAction('CreateVisitaSintomaEnfermedadSuccess');

export const CreateVisitaSintomaEnfermedadFailure = createAction('CreateVisitaSintomaEnfermedadFailure', props<{ errorMessage: string }>());

export const UpdateVisitaSintomaEnfermedad = createAction('UpdateVisitaSintomaEnfermedad', props<{ visitaSintomaEnfermedad: any }>());

export const UpdateVisitaSintomaEnfermedadSuccess = createAction('UpdateVisitaSintomaEnfermedadSuccess');

export const UpdateVisitaSintomaEnfermedadFailure = createAction('UpdateVisitaSintomaEnfermedadFailure', props<{ errorMessage: string }>());