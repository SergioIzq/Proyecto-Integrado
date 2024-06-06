import { Visita } from "./visita.model";

export class Paciente {
    public Id!: number;
    public Nombre!: string;
    public Apellidos!: string;
    public Edad!: number;
    public ListaVisitas!: Visita[];
    public CorreoElectronico!: string;
    public Contrasena!: string;
    public FechaRegistro!: Date;
    public Rol!: string;    
}