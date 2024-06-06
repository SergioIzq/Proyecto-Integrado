import { createAction, props } from '@ngrx/store';

export const LoginPaciente = createAction('LoginPaciente', props<{ correo: string, contrasena: string }>());

export const LoginMedico = createAction('LoginMedico', props<{ correo: string, contrasena: string }>());

export const LoginSuccess = createAction('LoginSuccess', props<{ response: string }>());

export const LoginFailure = createAction('LoginFailure');

export const CloseErrorModal = createAction('CloseErrorModal');

export const Logout = createAction('Logout');


