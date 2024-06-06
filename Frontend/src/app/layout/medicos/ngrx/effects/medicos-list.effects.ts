import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of, mergeMap, tap, map, catchError } from "rxjs";
import * as MedicosListActions from 'src/app/layout/medicos/ngrx/actions/medicos-list.actions';
import { MedicoService } from '../../services/medico.service';

@Injectable()

export class MedicoListEffects {
  constructor(
    private actions$: Actions,
    private medicoService: MedicoService
  ) { }

  loadMedicos$ = createEffect(() => this.actions$.pipe(
    ofType(MedicosListActions.LoadingMedicos),
    mergeMap(({ page, size, sortField, sortOrder, filters }) =>
      this.medicoService.getCantidad(page, size, sortField, sortOrder, filters)
      .pipe(
        map(listaMedicos => MedicosListActions.LoadingMedicosSuccess({ listaMedicos })),
        catchError(() => of(MedicosListActions.LoadingMedicosFailure()))
      )
    )
  ));

  deletePaciente$ = createEffect(() => this.actions$.pipe(
    ofType(MedicosListActions.DeleteMedico),
    mergeMap((paciente) => this.medicoService.delete(paciente.id)
      .pipe(
        map(() => MedicosListActions.DeleteMedicoSuccess()),
        catchError((error) => {
          console.error('Error el eliminar al paciente:', error);
          let errorMessage = 'Error desconocido en la eliminación de la paciente';

          // Verificar si el error contiene un cuerpo de respuesta y si ese cuerpo es un string
          if (error && error.error && typeof error.error === 'string') {
            // Utilizamos el cuerpo de respuesta como mensaje de error
            errorMessage = error.error;
          }

          // Retornar una acción con el error
          return of(MedicosListActions.DeleteMedicoFailure({ errorMessage: errorMessage }));
        })
      )
    )
  ));

}
