import { createAction, props } from '@ngrx/store';
import { Paciente } from 'src/app/shared/models/entidades/paciente.model';

export const GetUserId = createAction('GetUserId');

export const GetUserIdSuccess = createAction('GetUserIdSuccess', props<{ id: number }>());

export const GetUserIdFailure = createAction('GetUserIdFailure');

export const GetPaciente = createAction('GetPaciente', props<{ id: number }>());

export const GetPacienteSuccess = createAction('GetPacienteSuccess', props<{ paciente: Paciente }>());

export const GetPacienteFailure = createAction('GetPacienteFailure');

export const DeleteVisita = createAction('DeleteVisita', props<{ id: number }>());

export const DeleteVisitaSuccess = createAction('DeleteVisitaSuccess');

export const DeleteVisitaFail = createAction('DeleteVisitaFail');