import { createAction, props } from '@ngrx/store';
import { Enfermedad } from 'src/app/shared/models/entidades/enfermedad.model';


export const GetEnfermedad = createAction('GetEnfermedad', props<{ id: number }>());

export const GetEnfermedadSuccess = createAction('GetEnfermedadSuccess', props<{ enfermedad: Enfermedad }>());

export const GetEnfermedadFail = createAction('GetEnfermedadFail');

export const UpdateEnfermedad = createAction('UpdateEnfermedad', props<{ enfermedad: Partial<Enfermedad> }>());

export const UpdateEnfermedadFailure = createAction('UpdateEnfermedadFailure', props<{ errorMessage: string }>());

export const UpdateEnfermedadSuccess = createAction('UpdateEnfermedadSuccess', props<{ enfermedad: Enfermedad }>());

export const DeleteEnfermedad = createAction('DeleteEnfermedad', props<{ id: number }>());

export const DeleteEnfermedadSuccess = createAction('DeleteEnfermedadSuccess');

export const DeleteEnfermedadFail = createAction('DeleteEnfermedadFailD');

export const CreateEnfermedad = createAction('CreateEnfermedad', props<{ payload: Enfermedad }>());

export const CreateEnfermedadSuccess = createAction('CreateEnfermedadSuccess');

export const CreateEnfermedadFailure = createAction('CreateEnfermedadFailure', props<{ errorMessage: string }>());

export const GetNewEnfermedad = createAction('GetNewEnfermedad', props<{ payload: number }>());

export const GetNewEnfermedadSuccess = createAction('GetNewEnfermedadSuccess', props<{ payload: Enfermedad }>());

export const GetNewEnfermedadFail = createAction('GetNewEnfermedadFail');

export const CloseModal = createAction('CloseModal');
