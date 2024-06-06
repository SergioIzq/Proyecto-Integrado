import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of, mergeMap } from "rxjs";
import { map, catchError } from "rxjs";
import { VisitaService } from "../../services/visitas.service";
import * as VisitasListActions from 'src/app/layout/visitas/ngrx/actions/visitas-list.actions';


@Injectable()

export class VisitasListEffects {
  constructor(
    private actions$: Actions,
    private visitasService: VisitaService
  ) { }

  loadVisitas$ = createEffect(() => this.actions$.pipe(
    ofType(VisitasListActions.LoadingVisitas),
    mergeMap(({ page, size, sortField, sortOrder, filters }) =>
      this.visitasService.getCantidad(page, size, sortField, sortOrder, filters)
        .pipe(
          map(listaVisitas => VisitasListActions.LoadingVisitasSuccess({ listaVisitas })),
          catchError(() => of(VisitasListActions.LoadingVisitasFailure()))
        )
    )
  ));

  deleteVisita$ = createEffect(() => this.actions$.pipe(
    ofType(VisitasListActions.DeleteVisita),
    mergeMap((visita) => this.visitasService.delete(visita.id)
      .pipe(
        map(() => VisitasListActions.DeleteVisitaSuccess()),
        catchError((error) => {
          console.error('Error el eliminar la visita:', error);
          let errorMessage = 'Error desconocido en la eliminación de la visita';

          // Verificar si el error contiene un cuerpo de respuesta y si ese cuerpo es un string
          if (error && error.error && typeof error.error === 'string') {
            // Utilizamos el cuerpo de respuesta como mensaje de error
            errorMessage = error.error;
          }

          // Retornar una acción con el error
          return of(VisitasListActions.DeleteVisitaFail({ errorMessage: errorMessage }));
        })
      )
    )
  ));

}
