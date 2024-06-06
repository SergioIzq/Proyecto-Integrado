import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of, mergeMap } from "rxjs";
import { map, catchError } from "rxjs";
import * as MedicamentosListActions from '../actions/medicamentos-list.actions';
import { MedicamentoService } from '../../services/medicamento.service';

@Injectable()

export class MedicamentosListEffects {
  constructor(
    private actions$: Actions,
    private medicamentosService: MedicamentoService
  ) { }

  loadMedicamentos$ = createEffect(() => this.actions$.pipe(
    ofType(MedicamentosListActions.LoadingMedicamentos),
    mergeMap(() => this.medicamentosService.getAll()
      .pipe(
        map(listaMedicamentos => MedicamentosListActions.LoadingMedicamentosSuccess({ listaMedicamentos })),
        catchError(() => of(MedicamentosListActions.LoadingMedicamentosFailure()))
      ))
  )
  );
}
