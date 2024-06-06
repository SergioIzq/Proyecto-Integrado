import { createAction, props } from '@ngrx/store';
import { Medico } from 'src/app/shared/models/entidades/medico.model';


export const GetMedico = createAction('GetMedico', props<{ id: number }>());

export const GetMedicoSuccess = createAction('GetMedicoSuccess', props<{ medico: Medico }>());

export const GetMedicoFail = createAction('GetMedicoFail');

export const UpdateMedico = createAction('UpdateMedico', props<{ medico: Partial<Medico> }>());

export const UpdateMedicoFailure = createAction('UpdateMedicoFailure', props<{ errorMessage: string }>());

export const UpdateMedicoSuccess = createAction('UpdateMedicoSuccess', props<{ medico: Medico }>());

export const DeleteMedico = createAction('DeleteMedico', props<{ id: number }>());

export const DeleteMedicoSuccess = createAction('DeleteMedicoSuccess');

export const DeleteMedicoFail = createAction('DeleteMedicoFail');

export const CreateMedico = createAction('CreateMedico', props<{ payload: Medico }>());

export const CreateMedicoSuccess = createAction('CreateMedicoSuccess');

export const CreateMedicoFailure = createAction('CreateMedicoFail', props<{ errorMessage: string }>());

export const CloseErrorModal = createAction('CloseErrorModal');

export const CloseSuccessModal = createAction('CloseSuccessModal');