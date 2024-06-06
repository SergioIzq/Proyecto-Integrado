import { ActionReducerMap } from "@ngrx/store";
import { visitasListReducer } from "./layout/visitas/ngrx/reducer/visitas-list.reducer";

import { VisitaDetailState } from "./shared/models/entidades/estados/visitadetailstate.model";
import { VisitaDetailReducer } from './layout/visitas/ngrx/reducer/visita-detail.reducer';
import { pacientesListReducer } from "./layout/pacientes/ngrx/reducer/pacientes-list.reducer";
import { PacienteDetailState } from "./shared/models/entidades/estados/pacientedetailstate.model";
import { PacienteDetailReducer } from "./layout/pacientes/ngrx/reducer/paciente-detail.reducer";
import { MenuState } from "./shared/models/entidades/estados/menustate.model";
import { MenuReducer } from "./shared/menu/ngrx/reducer/menu.reducer";
import { RegistroState } from "./shared/models/entidades/estados/registrostate.model";
import { RegistroReducer } from "./shared/auth/registro/ngrx/reducer/registro.reducer";
import { AuthState } from "./shared/models/entidades/estados/authstate.model";
import { authReducer } from "./shared/auth/login/ngrx/reducer/login.reducer";
import { EntidadListState } from "./shared/models/entidades/estados/visitasListState.model";
import { Paciente } from "./shared/models/entidades/paciente.model";
import { Medico } from "./shared/models/entidades/medico.model";
import { MedicosListReducer } from "./layout/medicos/ngrx/reducer/medicos-list.reducer";
import { MedicoDetailState } from "./shared/models/entidades/estados/medicodetailstate.model";
import { MedicoDetailReducer } from "./layout/medicos/ngrx/reducer/medico-detail.reducer";
import { HistorialPacienteState } from "./shared/models/entidades/estados/historialPacienteState.model";
import { HistorialPacienteReducer } from "./layout/pacientes/ngrx/reducer/paciente-historial.reducer";
import { Medicamento } from "./shared/models/entidades/medicamento.model";
import { medicamentosListReducer } from "./layout/medicamentos/ngrx/reducer/medicamentos-list.reducer";
import { Enfermedad } from "./shared/models/entidades/enfermedad.model";
import { enfermedadesListReducer } from "./layout/enfermedades/ngrx/reducer/enfermedades-list.reducer";
import { EnfermedadDetailState } from "./shared/models/entidades/estados/enfermedad-detail.model";
import { EnfermedadDetailReducer } from './layout/enfermedades/ngrx/reducer/enfermedad-detail.reducer';

export interface AppState {
    visitas: EntidadListState<Paciente>;
    visitaPorId: VisitaDetailState;
    lista: EntidadListState<Paciente>;
    pacientePorId: PacienteDetailState;
    menu: MenuState,
    registro: RegistroState,
    auth: AuthState,
    listaMedicos: EntidadListState<Medico>,
    medicoPorId: MedicoDetailState,
    paciente: HistorialPacienteState,
    listaMedicamentos: EntidadListState<Medicamento>,
    listaEnfermedades: EntidadListState<Enfermedad>,
    enfermedadPorId: EnfermedadDetailState
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    visitas: visitasListReducer,
    visitaPorId: VisitaDetailReducer,
    lista: pacientesListReducer,
    pacientePorId: PacienteDetailReducer,
    menu: MenuReducer,
    registro: RegistroReducer,
    auth: authReducer,
    listaMedicos: MedicosListReducer,
    medicoPorId: MedicoDetailReducer,
    paciente: HistorialPacienteReducer,
    listaMedicamentos: medicamentosListReducer,
    listaEnfermedades: enfermedadesListReducer,
    enfermedadPorId: EnfermedadDetailReducer
}