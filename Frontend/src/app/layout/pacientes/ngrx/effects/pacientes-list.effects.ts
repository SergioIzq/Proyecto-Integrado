import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of, mergeMap } from "rxjs";
import { map, catchError } from "rxjs";
import * as PacientesListActions from 'src/app/layout/pacientes/ngrx/actions/pacientes-list.actions';
import { PacienteService } from '../../services/paciente.service';

@Injectable()

export class PacientesListEffects {
  constructor(
    private actions$: Actions,
    private pacientesService: PacienteService
  ) { }

  loadPacientes$ = createEffect(() => this.actions$.pipe(
    ofType(PacientesListActions.LoadingPacientes),
    mergeMap(({ page, size, sortField, sortOrder, filters }) =>
      this.pacientesService.getCantidad(page, size, sortField, sortOrder, filters)
      .pipe(
        map(listaPacientes => PacientesListActions.LoadingPacientesSuccess({ listaPacientes })),
        catchError(() => of(PacientesListActions.LoadingPacientesFailure()))
      )
    )
  ));

  deletePaciente$ = createEffect(() => this.actions$.pipe(
    ofType(PacientesListActions.DeletePaciente),
    mergeMap((paciente) => this.pacientesService.delete(paciente.id)
      .pipe(
        map(() => PacientesListActions.DeletePacienteSuccess()),
        catchError((error) => {
          console.error('Error el eliminar al paciente:', error);
          let errorMessage = 'Error desconocido en la eliminación de la paciente';

          // Verificar si el error contiene un cuerpo de respuesta y si ese cuerpo es un string
          if (error && error.error && typeof error.error === 'string') {
            // Utilizamos el cuerpo de respuesta como mensaje de error
            errorMessage = error.error;
          }

          // Retornar una acción con el error
          return of(PacientesListActions.DeletePacienteFailure({ errorMessage: errorMessage }));
        })
      )
    )
  ));
  
}
