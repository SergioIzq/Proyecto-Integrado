import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import { RegistroState } from '../../../../models/entidades/estados/registrostate.model';


export const selectRegistroFeature = (state: AppState) => state.registro

export const selectCargando = createSelector(
    selectRegistroFeature,
    (state: RegistroState) => state.cargando
);

export const selectMostrarModalError = createSelector(
    selectRegistroFeature,
    (state: RegistroState) => state.mostrarRegistroModalError
);

export const selectMostrarModalSuccess = createSelector(
    selectRegistroFeature,
    (state: RegistroState) => state.mostrarRegistroSuccess
);