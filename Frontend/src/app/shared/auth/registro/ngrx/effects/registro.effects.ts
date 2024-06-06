import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { AuthService } from 'src/app/shared/services/auth.service';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { of, tap } from 'rxjs';
import * as RegistroActions from '../actions/registro.actions';

@Injectable()
export class RegistroEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
  ) { }

  registroMedico$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegistroActions.RegistroMedico),
      mergeMap(({ medico }) =>
        this.authService.registerMedico(medico).pipe(        
          map(() => {
            return RegistroActions.RegistroSuccess(); // Emitir una acción de éxito de inicio de sesión
          }),
          catchError((error) => {
              console.error('Error en el registro:', error);
              return of(RegistroActions.RegistroFailure());            
          })
        )
      )
    )
  );

  registroPaciente$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegistroActions.RegistroPaciente),
      switchMap(({ paciente }) =>
        this.authService.registerPaciente(paciente).pipe(
          map(() => RegistroActions.RegistroSuccess()), // Emitir una acción de éxito si no hay errores
          catchError((error) => {
              console.error('Error en el registro:', error);
              return of(RegistroActions.RegistroFailure());
          })
        )
      )
    )
  );

}
