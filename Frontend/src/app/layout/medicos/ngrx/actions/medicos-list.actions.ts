import { createAction, props } from '@ngrx/store';
import { Medico } from 'src/app/shared/models/entidades/medico.model';

export const LoadingMedicos = createAction('LoadingMedicos', props<{ page: number, size: number, sortField: any, sortOrder: any, filters: any }>());

export const LoadingMedicosSuccess = createAction('LoadingMedicosSuccess', props<{ listaMedicos: Medico[] }>());

export const LoadingMedicosFailure = createAction('LoadingMedicosFailure');

export const DeleteMedico = createAction('DeleteMedico', props<{ id: number }>());

export const DeleteMedicoSuccess = createAction('DeleteMedicoSuccess');

export const DeleteMedicoFailure = createAction('DeleteMedicoFailure', props<{ errorMessage: string }>());

export const CloseModal = createAction('CloseModal');
