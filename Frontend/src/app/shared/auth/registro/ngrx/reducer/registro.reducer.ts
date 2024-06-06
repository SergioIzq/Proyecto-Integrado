import { createReducer, on } from '@ngrx/store';
import * as RegistroActions from '../actions/registro.actions';
import { RegistroState } from '../../../../models/entidades/estados/registrostate.model';

export const estadoInicial: RegistroState = { cargando: false, error: null, mostrarRegistroModalError: false, mostrarRegistroSuccess: false };

const registroReducer = createReducer(
  estadoInicial,
  on(RegistroActions.RegistroMedico, (state) => ({
    ...state,
    cargando: true,
    error: null
  })),
  on(RegistroActions.RegistroPaciente, (state) => ({
    ...state,
    cargando: true,
    error: null
  })),
  on(RegistroActions.RegistroSuccess, (state) => ({
    ...state,
    cargando: false,
    error: null,
    mostrarRegistroSuccess: true
  })),
  on(RegistroActions.RegistroFailure, (state) => ({
    ...state,
    cargando: false,
    error: null, 
    mostrarRegistroModalError: true
  })),
  on(RegistroActions.CloseErrorModal, (state) => ({
    ...state,
    mostrarRegistroModalError: false
  })),
  on(RegistroActions.CloseSuccessModal, (state) => ({
    ...state,
    mostrarRegistroSuccess: false
  }))
);

export function RegistroReducer(state: RegistroState = estadoInicial, action: any): RegistroState {
  return registroReducer(state, action);
}
