import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of, mergeMap, map, catchError, switchMap } from "rxjs";
import { VisitaService } from "../../services/visitas.service";
import * as VisitaDetailActions from "../actions/visita-detail.actions"
import { Router } from "@angular/router";
import { VisitaSintomaEnfermedadService } from '../../services/visitaSintomaEnfermedad.service';

@Injectable()

export class VisitaDetailEffects {
  constructor(
    private actions$: Actions,
    private visitaDetailService: VisitaService,
    private router: Router,
    private visitaSintomaEnfermedadService: VisitaSintomaEnfermedadService
  ) { }

  getVisita$ = createEffect(() => this.actions$.pipe(
    ofType(VisitaDetailActions.GetVisita),
    mergeMap(({ id }) => this.visitaDetailService.getById(id)
      .pipe(
        map(visita => VisitaDetailActions.GetVisitaSuccess({ visita })),
        catchError(() => of(VisitaDetailActions.GetVisitaFail()))
      )
    )
  ));

  updateVisita$ = createEffect(() => this.actions$.pipe(
    ofType(VisitaDetailActions.UpdateVisita),
    mergeMap(({ visita, visitaSintomaEnfermedad }) => this.visitaDetailService.update(visita)
      .pipe(
        switchMap(() => [
          VisitaDetailActions.UpdateVisitaSuccess(),
          VisitaDetailActions.UpdateVisitaSintomaEnfermedad({ visitaSintomaEnfermedad })
        ]),
        catchError((error) => {
          console.error('Error al editar la visita:', error);
          let errorMessage = 'Error desconocido al editar la visita';

          // Verificar si el error contiene un cuerpo de respuesta y si ese cuerpo es un string
          if (error && error.error && typeof error.error === 'string') {
            // Utilizamos el cuerpo de respuesta como mensaje de error
            errorMessage = error.error;
          }

          // Retornar una acción con el error
          return of(VisitaDetailActions.UpdateVisitaFailure({ errorMessage: errorMessage }));
        })
      )
    )
  ));

  updateVisitaSintomaEnfermedad$ = createEffect(() => this.actions$.pipe(
    ofType(VisitaDetailActions.UpdateVisitaSintomaEnfermedad),
    mergeMap(({ visitaSintomaEnfermedad }) => this.visitaSintomaEnfermedadService.update(visitaSintomaEnfermedad)
      .pipe(
        map(() => VisitaDetailActions.UpdateVisitaSintomaEnfermedadSuccess()),
        catchError((error) => {
          console.error('Error al actualizar los síntomas y enfermedades de la visita:', error);
          let errorMessage = 'Error desconocido al actualizar los síntomas y enfermedades de la visita';

          // Verificar si el error contiene un cuerpo de respuesta y si ese cuerpo es un string
          if (error && error.error && typeof error.error === 'string') {
            // Utilizamos el cuerpo de respuesta como mensaje de error
            errorMessage = error.error;
          }

          // Retornar una acción con el error
          return of(VisitaDetailActions.UpdateVisitaSintomaEnfermedadFailure({ errorMessage: errorMessage }));
        })
      )
    )
  ));

  createVisita$ = createEffect(() => this.actions$.pipe(
    ofType(VisitaDetailActions.CreateVisita),
    mergeMap(({ payload, visitaSintomaEnfermedad }) => this.visitaDetailService.create(payload)
      .pipe(
        switchMap(() => [
          VisitaDetailActions.CreateVisitaSuccess(),
          VisitaDetailActions.CreateVisitaSintomaEnfermedad({ visitaSintomaEnfermedad })
        ]),
        catchError((error) => {
          console.error('Error en la creación de la visita:', error);
          let errorMessage = 'Error desconocido en la creación de la visita';

          if (error && error.error && typeof error.error === 'string') {
            errorMessage = error.error;
          }

          return of(VisitaDetailActions.CreateVisitaFailure({ errorMessage: errorMessage }));
        })
      )
    )
  ));

  createVisitaSintomaEnfermedad$ = createEffect(() => this.actions$.pipe(
    ofType(VisitaDetailActions.CreateVisitaSintomaEnfermedad),
    mergeMap(({ visitaSintomaEnfermedad }) => this.visitaSintomaEnfermedadService.create(visitaSintomaEnfermedad)
      .pipe(
        map(() => VisitaDetailActions.CreateVisitaSintomaEnfermedadSuccess()),
        catchError((error) => {
          console.error('Error en la creación de la visita:', error);
          let errorMessage = 'Error desconocido en la creación de la visita';

          // Verificar si el error contiene un cuerpo de respuesta y si ese cuerpo es un string
          if (error && error.error && typeof error.error === 'string') {
            // Utilizamos el cuerpo de respuesta como mensaje de error
            errorMessage = error.error;
          }

          // Retornar una acción con el error
          return of(VisitaDetailActions.CreateVisitaSintomaEnfermedadFailure({ errorMessage: errorMessage }));
        })
      )
    )
  ));

}

