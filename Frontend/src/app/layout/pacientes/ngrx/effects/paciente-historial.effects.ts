import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of, mergeMap } from "rxjs";
import { map, catchError } from "rxjs";
import * as PacienteHistorialActions from '../actions/paciente-historial.actions';
import { PacienteService } from '../../services/paciente.service';
import { AuthService } from "src/app/shared/services/auth.service";


@Injectable()

export class PacienteHistorialEffects {
    constructor(
        private actions$: Actions,
        private pacienteService: PacienteService,
        private authService: AuthService
    ) { }

    getUserId$ = createEffect(() => this.actions$.pipe(
        ofType(PacienteHistorialActions.GetUserId),
        mergeMap(() => this.authService.getUserId().pipe(
            map(id => PacienteHistorialActions.GetUserIdSuccess({ id })),
            catchError(() => of(PacienteHistorialActions.GetUserIdFailure()))
        ))
    ));

    getPaciente$ = createEffect(() => this.actions$.pipe(
        ofType(PacienteHistorialActions.GetPaciente),
        mergeMap(({ id }) => this.pacienteService.getById(id)
            .pipe(
                map(paciente => PacienteHistorialActions.GetPacienteSuccess({ paciente })),
                catchError(() => of(PacienteHistorialActions.GetPacienteFailure()))
            )
        )
    ));

    deleteVisita$ = createEffect(() => this.actions$.pipe(
        ofType(PacienteHistorialActions.DeleteVisita),
        mergeMap((visita) => this.pacienteService.delete(visita.id)
            .pipe(
                map(() => PacienteHistorialActions.DeleteVisitaSuccess()),
                catchError(() => of(PacienteHistorialActions.DeleteVisitaFail()))
            )
        )
    ));
}
