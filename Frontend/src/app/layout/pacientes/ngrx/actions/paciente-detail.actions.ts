import { createAction, props } from '@ngrx/store';
import { Paciente } from 'src/app/shared/models/entidades/paciente.model';


export const GetPaciente = createAction('GetPaciente', props<{ id: number }>());

export const GetPacienteSuccess = createAction('GetPacienteSuccess', props<{ paciente: Paciente }>());

export const GetPacienteFail = createAction('GetPacienteFail');

export const UpdatePaciente = createAction('UpdatePaciente', props<{ paciente: Partial<Paciente> }>());

export const UpdatePacienteFailure = createAction('UpdatePacienteFailure', props<{ errorMessage: string }>());

export const UpdatePacienteSuccess = createAction('UpdatePacienteSuccess', props<{ paciente: Paciente }>());

export const DeletePaciente = createAction('DeletePaciente', props<{ id: number }>());

export const DeletePacienteSuccess = createAction('DeletePacienteSuccess');

export const DeletePacienteFail = createAction('DeletePacienteFailD');

export const CreatePaciente = createAction('CreatePaciente', props<{ payload: Paciente }>());

export const CreatePacienteSuccess = createAction('CreatePacienteSuccess');

export const CreatePacienteFailure = createAction('CreatePacienteFailure', props<{ errorMessage: string }>());

export const GetNewPaciente = createAction('GetNewPaciente', props<{ payload: number }>());

export const GetNewPacienteSuccess = createAction('GetNewPacienteSuccess', props<{ payload: Paciente }>());

export const GetNewPacienteFail = createAction('GetNewPacienteFail');

export const CloseErrorModal = createAction('CloseErrorModal');

export const CloseSuccessModal = createAction('CloseSuccessModal');
