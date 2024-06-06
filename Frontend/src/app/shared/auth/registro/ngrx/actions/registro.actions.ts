import { createAction, props } from '@ngrx/store';
import { Medico } from 'src/app/shared/models/entidades/medico.model';
import { Paciente } from 'src/app/shared/models/entidades/paciente.model';

export const RegistroMedico = createAction('RegistroMedico', props<{ medico: Medico }>());

export const RegistroPaciente = createAction('RegistroPaciente', props<{ paciente: Paciente }>());

export const RegistroSuccess = createAction('RegistroSuccess');

export const RegistroFailure = createAction('RegistroFailure');

export const CloseErrorModal = createAction('CloseErrorModal');

export const CloseSuccessModal = createAction('CloseSuccessModal');
