import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/login.actions';
import { AuthState } from 'src/app/shared/models/entidades/estados/authstate.model';

export const estadoInicial: AuthState = { errorMessage: '', mostrarModalError: false };

export const authReducer = createReducer(
    estadoInicial,
    on(AuthActions.LoginSuccess, (state) => ({
        ...state,
        errorMessage: '',
        mostrarModalError: false // Ocultar el modal de error en caso de éxito
    })),
    on(AuthActions.LoginFailure, (state) => ({
        ...state,
        mostrarModalError: true // Mostrar el modal de error en caso de fallo
    })),
    on(AuthActions.CloseErrorModal, (state) => ({
        ...state,
        mostrarModalError: false
    }))
);
