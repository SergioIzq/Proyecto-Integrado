import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, catchError, tap, of, mergeMap } from "rxjs";
import { PacienteService } from "../../services/paciente.service";
import * as PacienteDetailActions from "../actions/paciente-detail.actions"
import { Router } from "@angular/router";

@Injectable()

export class PacienteDetailEffects {
  constructor(
    private actions$: Actions,
    private PacienteDetailService: PacienteService,
    private router:Router
  ) { }

  getPaciente$ = createEffect(() => this.actions$.pipe(
    ofType(PacienteDetailActions.GetPaciente),
    mergeMap(({ id }) => this.PacienteDetailService.getById(id)
      .pipe(
        map(paciente => PacienteDetailActions.GetPacienteSuccess({ paciente })),
        catchError(() => of(PacienteDetailActions.GetPacienteFail()))
      )
    )
  ));

  updatePaciente$ = createEffect(() => this.actions$.pipe(
    ofType(PacienteDetailActions.UpdatePaciente),
    mergeMap(({ paciente }) => this.PacienteDetailService.update(paciente)
      .pipe(
        map(paciente => PacienteDetailActions.UpdatePacienteSuccess({ paciente })),
        catchError((error) => of(PacienteDetailActions.UpdatePacienteFailure(error)))
      )
    )
  ));

  createPaciente$ = createEffect(() => this.actions$.pipe(
    ofType(PacienteDetailActions.CreatePaciente),
    mergeMap(({ payload }) => this.PacienteDetailService.create(payload)
      .pipe(
        map(() => PacienteDetailActions.CreatePacienteSuccess()),
        catchError((error) => {
          console.error('Error en el registro:', error);
          return of(PacienteDetailActions.CreatePacienteFailure(error));            
      })
      )
    )
  ));

}
