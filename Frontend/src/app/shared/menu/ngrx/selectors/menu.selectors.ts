import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import { MenuState } from "src/app/shared/models/entidades/estados/menustate.model";

export const selectMenuFeature = (state: AppState) => state.menu

export const selectIsSidebarOpen = createSelector(
    selectMenuFeature,
    (state: MenuState) => state.isSidebarOpen
);

export const selectAuthStatus = createSelector(
    selectMenuFeature,
    (state: MenuState) => state.isLoggedIn
);

export const selectJWTToken = createSelector(
    selectMenuFeature,
    (state: MenuState) => state.jwtToken
);

export const selectRol = createSelector(
    selectMenuFeature,
    (state: MenuState) => state.rol
);

export const selectUserId = createSelector(
    selectMenuFeature,
    (state: MenuState) => state.id
);
