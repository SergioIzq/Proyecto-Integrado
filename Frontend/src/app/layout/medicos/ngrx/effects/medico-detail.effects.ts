import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, catchError, tap, of, mergeMap } from "rxjs";
import { MedicoService } from "../../services/medico.service";
import * as MedicoDetailActions from '../actions/medico-detail.actions'
import { Router } from "@angular/router";

@Injectable()

export class MedicoDetailEffects {
  constructor(
    private actions$: Actions,
    private medicoDetailService: MedicoService,
    private router:Router
  ) { }

  getMedico$ = createEffect(() => this.actions$.pipe(
    ofType(MedicoDetailActions.GetMedico),
    mergeMap(({ id }) => this.medicoDetailService.getById(id)
      .pipe(
        map(medico => MedicoDetailActions.GetMedicoSuccess({ medico })),
        catchError(() => of(MedicoDetailActions.GetMedicoFail()))
      )
    )
  ));

  updateMedico$ = createEffect(() => this.actions$.pipe(
    ofType(MedicoDetailActions.UpdateMedico),
    mergeMap(({ medico }) => this.medicoDetailService.update(medico)
      .pipe(
        map(medico => MedicoDetailActions.UpdateMedicoSuccess({ medico })),
        catchError((error) => of(MedicoDetailActions.UpdateMedicoFailure(error)))
      )
    )
  ));

  createMedico$ = createEffect(() => this.actions$.pipe(
    ofType(MedicoDetailActions.CreateMedico),
    mergeMap(({ payload }) => this.medicoDetailService.create(payload)
      .pipe(
        map(() => MedicoDetailActions.CreateMedicoSuccess()),
        catchError((error) => {
          console.error('Error en el registro:', error);
          return of(MedicoDetailActions.CreateMedicoFailure(error));            
      })
      )
    )
  ));

}
