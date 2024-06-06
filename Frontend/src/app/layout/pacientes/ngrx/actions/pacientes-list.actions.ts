import { createAction, props } from '@ngrx/store';
import { Paciente } from 'src/app/shared/models/entidades/paciente.model';

export const LoadingPacientes = createAction('LoadingPacientes', props<{ page: number, size: number, sortField: any, sortOrder: any, filters: any }>());

export const LoadingPacientesSuccess = createAction('LoadingPacientesSuccess', props<{ listaPacientes: Paciente[] }>());

export const LoadingPacientesFailure = createAction('LoadingPacientesFailure');

export const DeletePaciente = createAction('DeletePaciente', props<{ id: number }>());

export const DeletePacienteSuccess = createAction('DeletePacienteSuccess');

export const DeletePacienteFailure = createAction('DeletePacienteFailure', props<{ errorMessage: string }>());

export const CloseModal = createAction('CloseModal');