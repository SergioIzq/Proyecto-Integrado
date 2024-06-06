import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Observable, takeUntil, of } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Medico } from 'src/app/shared/models/entidades/medico.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { ActivatedRoute } from '@angular/router';
import * as MedicoDetailActions from '../../ngrx/actions/medico-detail.actions'
import * as MedicoSelector from '../../ngrx/selectors/medico-detail.selectors'
import { Location } from '@angular/common';

@Component({
  selector: 'app-medico-detail',
  templateUrl: './medico-detail.component.html',
  styleUrls: ['./medico-detail.component.css']
})
export class MedicoDetailComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  medicoId: number = 0;
  medicoPorId$!: Observable<Medico | null>;
  cargando$!: Observable<boolean>;
  error$!: Observable<boolean>;
  detailMedicoForm: FormGroup;
  originalMedicoData!: Medico;
  isNewMedico: boolean = false;
  newMedicoForm!: FormGroup;
  showErrorCrearModal: boolean = false;
  showCrearSuccessModal: boolean = false;
  showEditarErrorModal: boolean = false;
  showEditarSuccessModal: boolean = false;
  crearSuccessModal: boolean = false;
  errorMessage!: string;
  horarioPattern = /^(?:[01]\d|2[0-3]):(?:[0-5]\d)-(?:[01]\d|2[0-3]):(?:[0-5]\d)$/;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location
  ) {

    this.newMedicoForm = this.fb.group({
      Nombre: ['', Validators.required],
      Apellidos: ['', Validators.required],
      Especialidad: ['', Validators.required],
      CorreoElectronico: ['', Validators.required],
      Contrasena: ['', Validators.required],
      HorarioLaboral: ['', Validators.required],
      Rol: ['M', Validators.required]
    });
    this.detailMedicoForm = this.fb.group({
      Id: [''],
      Nombre: [''],
      Apellidos: [''],
      CorreoElectronico: [''],
      Especialidad: [''],
      HorarioLaboral: ['', Validators.required],
    });

  }

  ngOnInit(): void {

    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const idString = params.get('id');
      if (idString !== null) {
        const id = parseInt(idString, 10);
        this.medicoId = id;
        if (id === 0) {
          // Si el ID es 0, significa que es una nueva visita
          this.isNewMedico = true;
          this.medicoPorId$ = of(null); // Establecer la visita a null para indicar que es nueva
        } else {
          // Si el ID no es 0, obtener la visita por el ID
          this.store.dispatch(MedicoDetailActions.GetMedico({ id: id }));
          this.medicoPorId$ = this.store.select(MedicoSelector.selectedMedicoSelector);
        }
      } else {
        console.error('No hay id por parámetro');
      }
    });

    this.medicoPorId$ = this.store.select(MedicoSelector.selectedMedicoSelector);

    this.store.select(MedicoSelector.selectShowCrearErrorModal).pipe(takeUntil(this.destroy$)).subscribe((showErrorCrearModal: boolean) => {
      this.showErrorCrearModal = showErrorCrearModal;
    });

    this.store.select(MedicoSelector.selectShowEditarErrorModal).pipe(takeUntil(this.destroy$)).subscribe((showEditarErrorModal: boolean) => {
      this.showEditarErrorModal = showEditarErrorModal;
    });

    this.store.select(MedicoSelector.selectShowEditarSuccessModal).pipe(takeUntil(this.destroy$)).subscribe((showEditarSuccessModal: boolean) => {
      this.showEditarSuccessModal = showEditarSuccessModal;
    });

    this.store.select(MedicoSelector.selectShowCrearSuccessModal).pipe(takeUntil(this.destroy$)).subscribe((crearSuccessModal: boolean) => {
      this.crearSuccessModal = crearSuccessModal;
    });

    this.store.select(MedicoSelector.selectErrorMessage).pipe(takeUntil(this.destroy$)).subscribe((errorMessage: string) => {
      this.errorMessage = errorMessage;      
    });

    this.medicoPorId$
      .pipe(takeUntil(this.destroy$))
      .subscribe((medico: Medico | null) => {
        if (medico) {
          this.detailMedicoForm.patchValue(medico);
          this.originalMedicoData = { ...medico }; // Almacena una copia de los datos originales          
        }
      });

    this.cargando$ = this.store.select(MedicoSelector.selectCargando);
    this.error$ = this.store.select(MedicoSelector.selectErrorCarga);

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit() {
    if (this.isNewMedico) {
      const newMedicoData = this.newMedicoForm.value;
      if (!this.horarioPattern.test(newMedicoData.HorarioLaboral)) {
        // Si el horario laboral no coincide con el patrón, disparar MedicoFailure
        this.store.dispatch(MedicoDetailActions.CreateMedicoFailure({errorMessage: 'Horario laboral incorrecto'}));
        return;
      }
  
      // Obtener las horas y minutos del horario laboral
      const [horaInicio, minutoInicio, horaFin, minutoFin] = newMedicoData.HorarioLaboral.split(/[:-]/).map(Number);
  
      // Validar que la primera hora sea menor que la segunda
      if (horaInicio > horaFin || (horaInicio === horaFin && minutoInicio >= minutoFin)) {
        this.store.dispatch(MedicoDetailActions.CreateMedicoFailure({errorMessage: 'Horario laboral mínimo 1 minuto'}));
        return;
      }
  
      this.store.dispatch(MedicoDetailActions.CreateMedico({ payload: newMedicoData }));
    } else {
      const updatedMedicoData = { ...this.detailMedicoForm.value };
      updatedMedicoData.Id = this.originalMedicoData.Id;
      updatedMedicoData.Contrasena = this.originalMedicoData.Contrasena;
      updatedMedicoData.Rol = this.originalMedicoData.Rol;
  
      if (!this.horarioPattern.test(updatedMedicoData.HorarioLaboral)) {
        // Si el horario laboral no coincide con el patrón, disparar MedicoFailure
        this.store.dispatch(MedicoDetailActions.UpdateMedicoFailure({errorMessage: 'Horario laboral incorrecto'}));
        return;
      }
  
      // Obtener las horas y minutos del horario laboral
      const [horaInicio, minutoInicio, horaFin, minutoFin] = updatedMedicoData.HorarioLaboral.split(/[:-]/).map(Number);
  
      // Validar que la primera hora sea menor que la segunda
      if (horaInicio > horaFin || (horaInicio === horaFin && minutoInicio >= minutoFin)) {
        this.store.dispatch(MedicoDetailActions.UpdateMedicoFailure({errorMessage: 'Horario laboral mínimo 1 hora'}));
        return;
      }
  
      this.store.dispatch(MedicoDetailActions.UpdateMedico({ medico: updatedMedicoData }));
    }
  }
  

  goBack(): void {
    this.location.back();
  }

  minFechaActual(): string {
    const ahora = new Date();
    const anio = ahora.getFullYear();
    let mes: string | number = ahora.getMonth() + 1;
    let dia: string | number = ahora.getDate();
    let hora: string | number = ahora.getHours();
    let minutos: string | number = ahora.getMinutes();

    // Agrega un 0 al principio si el mes, día, hora o minutos es menor que 10 para mantener el formato
    mes = mes < 10 ? '0' + mes : mes;
    dia = dia < 10 ? '0' + dia : dia;
    hora = hora < 10 ? '0' + hora : hora;
    minutos = minutos < 10 ? '0' + minutos : minutos;

    // Formato: YYYY-MM-DDTHH:MM
    return `${anio}-${mes}-${dia}T${hora}:${minutos}`;
  }

  closeErrorModal(): void {
    // Emitir una acción para cerrar el modal de error
    this.store.dispatch(MedicoDetailActions.CloseErrorModal());
  }

  closeSuccessModal(): void {
    // Emitir una acción para cerrar el modal de success
    this.store.dispatch(MedicoDetailActions.CloseSuccessModal());
  }
}
