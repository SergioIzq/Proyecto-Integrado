import { createAction, props } from '@ngrx/store';

export const CheckAuthStatus = createAction('CheckAuthStatus');

export const ActualizarAuthStatus = createAction('ActualizarAuthStatus', props<{ isLoggedIn: boolean }>());

export const CambiarSidebar = createAction('CambiarSidebar');

export const updateJWTToken = createAction('updateJWTToken ', props<{ jwtToken: string | null }>());

export const GetJWTtoken = createAction('GetJWTtoken');

export const SetJWT = createAction('SetJWT', props<{ jwtToken: string | null }>());

export const GetUserDetails = createAction('GetUserDetails');

export const SetUserDetails = createAction('SetUserDetails', props<{ rol: string | null; id: string | null }>());