import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { AuthService } from 'src/app/shared/services/auth.service';
import * as MenuActions from '../actions/menu.actions';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Injectable()
export class MenuEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) { }

  getUserDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MenuActions.GetUserDetails),
      switchMap(() =>
        this.authService.updateUserRoleId().pipe(
          map(({ rol, id }) => {
            return MenuActions.SetUserDetails({ rol, id });
          }),          
          catchError(() => of(MenuActions.SetUserDetails({ rol: null, id: null })))
        )
      )
    )
  );

  checkAuthStatus$ = createEffect(() => this.actions$.pipe(
    ofType(MenuActions.CheckAuthStatus),
    switchMap(() => {
      const jwtToken = this.authService.getJwtToken();
      return of(jwtToken);
    }),
    map(jwtToken => {
      const isLoggedIn = !!jwtToken;
      return MenuActions.ActualizarAuthStatus({ isLoggedIn });
    }),
    catchError(() => EMPTY)
  ));

  getJWT$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MenuActions.GetJWTtoken),
      map(() => {
        const jwtToken = this.authService.getJwtToken();
        if (jwtToken === null) {
          return MenuActions.SetJWT({ jwtToken: '' }); // Asigna un valor predeterminado en caso de que el jwtToken sea null
        } else {
          return MenuActions.SetJWT({ jwtToken });
        }
      }),
      catchError(() => EMPTY)
    )
  );

}
