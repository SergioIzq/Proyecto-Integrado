import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import * as RegistroActions from './ngrx/actions/registro.actions';
import { selectCargando, selectMostrarModalError, selectMostrarModalSuccess } from './ngrx/selectors/registro.selectors';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Medico } from 'src/app/shared/models/entidades/medico.model';
import { Paciente } from 'src/app/shared/models/entidades/paciente.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit, OnDestroy {

  cargando$!: Observable<boolean>;
  showErrorModal: boolean = false;
  showModalSuccess: boolean = false;
  tipo: string = '';
  tipoControl = this.formBuilder.control('', Validators.required);
  horarioPattern = /^(?:[01]\d|2[0-3]):(?:[0-5]\d)-(?:[01]\d|2[0-3]):(?:[0-5]\d)$/;
  registroForm!: FormGroup;
  destroy$:Subject<boolean> = new Subject<boolean>();

  constructor(private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private router: Router) { }

  ngOnInit(): void {
    this.cargando$ = this.store.select(selectCargando);
    this.initForm();
    
    this.store.select(selectMostrarModalError).pipe(takeUntil(this.destroy$)).subscribe((showModal: boolean) => {
      this.showErrorModal = showModal;
    });

    this.store.select(selectMostrarModalSuccess).pipe(takeUntil(this.destroy$)).subscribe((showModalSuccess: boolean) => {
      this.showModalSuccess = showModalSuccess;
    });

  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private initForm(): void {
    this.registroForm = this.formBuilder.group({
      tipo: this.tipoControl,
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      horarioLaboral: [''],
      especialidad: [''],
      edad: ['']
    });
  }

  register(): void {

    const formData = this.registroForm.value;

    if (formData.tipo === 'medico') {
      
      if (!this.horarioPattern.test(formData.horarioLaboral)) {
        // Si el horario laboral no coincide con el patrón, disparar RegistroFailure
        this.store.dispatch(RegistroActions.RegistroFailure());        

        return;
      }
      // Obtener las horas y minutos del horario laboral
      const [horaInicio, minutoInicio, horaFin, minutoFin] = formData.horarioLaboral.split(/[:-]/).map(Number);

      // Validar que la primera hora sea menor que la segunda
      if (horaInicio > horaFin || (horaInicio === horaFin && minutoInicio >= minutoFin)) {
        this.store.dispatch(RegistroActions.RegistroFailure());

        return;
      }
      const medico: Medico = {
        Id: 0,
        FechaRegistro: new Date(),
        Nombre: formData.nombre,
        Apellidos: formData.apellidos,
        HorarioLaboral: formData.horarioLaboral,
        Especialidad: formData.especialidad,
        CorreoElectronico: formData.correo,
        Contrasena: formData.contrasena,
        Rol: 'M',
      };

      this.store.dispatch(RegistroActions.RegistroMedico({ medico }));

    } else if (formData.tipo === 'paciente') {      

      const paciente: Paciente = {
        Id: 0,
        Nombre: formData.nombre,
        Apellidos: formData.apellidos,
        Edad: formData.edad,
        ListaVisitas: [],
        CorreoElectronico: formData.correo,
        Contrasena: formData.contrasena,
        FechaRegistro: new Date(),
        Rol: 'P',
      };

      this.store.dispatch(RegistroActions.RegistroPaciente({ paciente }));
    } else {

      this.store.dispatch(RegistroActions.RegistroFailure());
    }
  }

  closeErrorModal(): void {
    this.store.dispatch(RegistroActions.CloseErrorModal());
  }

  closeSuccessModal(): void {
    this.store.dispatch(RegistroActions.CloseSuccessModal());
    this.router.navigate(['auth/login']);
  }

  stateOptions: any[] = [{ label: 'Medico', value: 'medico' }, { label: 'Paciente', value: 'paciente' }];

  value: string = 'tipo';
}
