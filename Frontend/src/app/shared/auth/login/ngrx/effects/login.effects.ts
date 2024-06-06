import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as LoginActions from '../actions/login.actions';

@Injectable()
export class LoginEffects {


  loginPaciente$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.LoginPaciente),
      mergeMap((action) =>
        this.authService.loginPaciente(action.correo, action.contrasena).pipe(
          map((response) => {
            return LoginActions.LoginSuccess({ response }); // Emitir una acción de éxito de inicio de sesión
          }),
          catchError(() => {
            return of(LoginActions.LoginFailure()); // Emitir una acción de fallo de inicio de sesión
          })
        )
      )
    )
  );


  loginMedico$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.LoginMedico),
      mergeMap((action) =>
        this.authService.loginMedico(action.correo, action.contrasena).pipe(
          map((response) => {
            return LoginActions.LoginSuccess({ response }); // Emitir una acción de éxito de inicio de sesión
          }),
          catchError(() => {
            return of(LoginActions.LoginFailure()); // Emitir una acción de fallo de inicio de sesión
          })
        )
      )
    )
  );

  // Redirigir al usuario a la página de inicio después del inicio de sesión exitoso
  redirectAfterLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.LoginSuccess),
      tap(() => {
        this.router.navigate(['/home']);
      })
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) { }
}
