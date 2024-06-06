import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, catchError, tap, of, mergeMap } from "rxjs";
import { EnfermedadService } from "../../services/enfermedad.service";
import * as EnfermedadDetailActions from "../actions/enfermedad-detail.actions"
import { Router } from "@angular/router";

@Injectable()

export class EnfermedadDetailEffects {
  constructor(
    private actions$: Actions,
    private EnfermedadDetailService: EnfermedadService,
    private router:Router
  ) { }

  getEnfermedad$ = createEffect(() => this.actions$.pipe(
    ofType(EnfermedadDetailActions.GetEnfermedad),
    mergeMap(({ id }) => this.EnfermedadDetailService.getById(id)
      .pipe(
        map(enfermedad => EnfermedadDetailActions.GetEnfermedadSuccess({ enfermedad })),
        catchError(() => of(EnfermedadDetailActions.GetEnfermedadFail()))
      )
    )
  ));

  updateEnfermedad$ = createEffect(() => this.actions$.pipe(
    ofType(EnfermedadDetailActions.UpdateEnfermedad),
    mergeMap(({ enfermedad }) => this.EnfermedadDetailService.update(enfermedad)
      .pipe(
        map(enfermedad => EnfermedadDetailActions.UpdateEnfermedadSuccess({ enfermedad })),
        catchError((error) => of(EnfermedadDetailActions.UpdateEnfermedadFailure(error)))
      )
    )
  ));

  createEnfermedad$ = createEffect(() => this.actions$.pipe(
    ofType(EnfermedadDetailActions.CreateEnfermedad),
    mergeMap(({ payload }) => this.EnfermedadDetailService.create(payload)
      .pipe(
        map(() => EnfermedadDetailActions.CreateEnfermedadSuccess()),
        catchError((error) => {
          console.error('Error en el registro:', error);
          return of(EnfermedadDetailActions.CreateEnfermedadFailure(error));            
      })
      )
    )
  ));

}
