import { createAction, props } from '@ngrx/store';
import { Medicamento } from 'src/app/shared/models/entidades/medicamento.model';

export const LoadingMedicamentos = createAction('LoadingMedicamentos');

export const LoadingMedicamentosSuccess = createAction('LoadingMedicamentosSuccess', props<{ listaMedicamentos: Medicamento[] }>());

export const LoadingMedicamentosFailure = createAction('LoadingMedicamentosFailure');

export const DeleteMedicamento = createAction('DeleteMedicamento', props<{ id: number }>());

export const DeleteMedicamentoSuccess = createAction('DeleteMedicamentoSuccess');

export const DeleteMedicamentoFail = createAction('DeleteMedicamentoFail');