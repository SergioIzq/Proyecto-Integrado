import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of, mergeMap } from "rxjs";
import { map, catchError } from "rxjs";
import * as EnfermedadesListActions from '../actions/enfermedades-list.actions';
import { EnfermedadService } from "../../services/enfermedad.service";

@Injectable()

export class EnfermedadesListEffects {
  constructor(
    private actions$: Actions,
    private enfermedadsService: EnfermedadService
  ) { }

  loadEnfermedads$ = createEffect(() => this.actions$.pipe(
    ofType(EnfermedadesListActions.LoadingEnfermedades),
    mergeMap(() => this.enfermedadsService.getAll()
      .pipe(
        map(listaEnfermedades => EnfermedadesListActions.LoadingEnfermedadesSuccess({ listaEnfermedades })),
        catchError(() => of(EnfermedadesListActions.LoadingEnfermedadesFailure()))
      ))
  )
  );

  deleteEnfermedad$ = createEffect(() => this.actions$.pipe(
    ofType(EnfermedadesListActions.DeleteEnfermedad),
    mergeMap((enfermedad) => this.enfermedadsService.delete(enfermedad.id)
      .pipe(
        map(() => EnfermedadesListActions.DeleteEnfermedadSuccess()),
        catchError((error) => {
          console.error('Error el eliminar la enfermedad:', error);
          let errorMessage = 'Error desconocido en la eliminación de la enfermedad';

          // Verificar si el error contiene un cuerpo de respuesta y si ese cuerpo es un string
          if (error && error.error && typeof error.error === 'string') {
            // Utilizamos el cuerpo de respuesta como mensaje de error
            errorMessage = error.error;
          }

          // Retornar una acción con el error
          return of(EnfermedadesListActions.DeleteEnfermedadFailure({ errorMessage: errorMessage }));
        })
      )
    )
  ));
}
