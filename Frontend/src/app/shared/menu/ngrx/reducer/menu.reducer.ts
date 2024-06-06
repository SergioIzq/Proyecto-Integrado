import { createReducer, on } from '@ngrx/store';
import * as MenuActions from '../actions/menu.actions';
import { MenuState } from 'src/app/shared/models/entidades/estados/menustate.model';
import { AuthService } from 'src/app/shared/services/auth.service';


export const estadoincial: MenuState = { isSidebarOpen: false, isLoggedIn: false, jwtToken: '', rol: null, id: null };

const menuReducer = createReducer(
    estadoincial,
    on(MenuActions.CambiarSidebar, state => ({
        ...state,
        isSidebarOpen: !state.isSidebarOpen
    })),
    on(MenuActions.ActualizarAuthStatus, (state, { isLoggedIn }) => {
        return {
            ...state,
            isLoggedIn
        };
    }),
    on(MenuActions.SetUserDetails, (state, { rol, id }) => ({
        ...state,
        rol,
        id
    })),
);

export function MenuReducer(state: MenuState = estadoincial, action: any): MenuState {
    return menuReducer(state, action);
}
