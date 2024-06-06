import { createAction, props } from '@ngrx/store';

export const LoadingVisitas = createAction('LoadingVisitas', props<{ page: number, size: number, sortField: any, sortOrder: any, filters: any }>());

export const LoadingVisitasSuccess = createAction('LoadingVisitasSuccess', props<{ listaVisitas: any[] }>());

export const LoadingVisitasFailure = createAction('LoadingVisitasFailure');

export const DeleteVisita = createAction('DeleteVisita', props<{ id: number }>());

export const DeleteVisitaSuccess = createAction('DeleteVisitaSuccess');

export const DeleteVisitaFail = createAction('DeleteVisitaFailList', props<{ errorMessage: string }>());

export const CloseModal = createAction('CloseModal');