import { Enfermedad } from "./enfermedad.model"
import { Sintoma } from "./sintoma.model";

export class SintomaEnfermedad {
    public Id!: number;
    public IdEnfermedad!: number;
    public IdSintoma!: number;
}