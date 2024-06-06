import { Medico } from "../medico.model";
import { Paciente } from "../paciente.model";

export interface RegistroState {
  cargando: boolean;
  error: any;
  mostrarRegistroModalError: boolean;
  mostrarRegistroSuccess: boolean;
}