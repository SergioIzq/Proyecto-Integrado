import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Observable, Subject, of } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Paciente } from 'src/app/shared/models/entidades/paciente.model';
import { selectCargando, selectErrorCarga, selectErrorMessage, selectShowCrearSuccessModal, selectShowEditarSuccessModal, selectedPacienteSelector } from '../../ngrx/selectors/paciente-detail.selectors';
import * as PacienteDetailActions from '../../ngrx/actions/paciente-detail.actions';
import { takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';
import { selectShowCrearErrorModal } from '../../ngrx/selectors/paciente-detail.selectors';
import { selectShowEditarErrorModal } from '../../ngrx/selectors/paciente-detail.selectors';

@Component({
  selector: 'app-paciente-detail',
  templateUrl: './paciente-detail.component.html',
  styleUrls: ['./paciente-detail.component.css']
})
export class PacienteDetailComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  pacienteId: number = 0;
  pacientePorId$!: Observable<Paciente | null>;
  cargando$!: Observable<boolean>;
  error$!: Observable<boolean>;
  detailPacienteForm: FormGroup;
  originalPacienteData!: Paciente;
  isNewPaciente: boolean = false;
  newPacienteForm!: FormGroup;
  showErrorCrearModal: boolean = false;
  showCrearSuccessModal: boolean = false;
  showEditarErrorModal: boolean = false;
  showEditarSuccessModal: boolean = false;
  crearSuccessModal: boolean = false;
  errorMessage!: string;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location
  ) {

    this.newPacienteForm = this.fb.group({
      Nombre: ['', Validators.required],
      Apellidos: ['', Validators.required],
      Edad: ['', Validators.required],
      CorreoElectronico: ['', Validators.required],
      Contrasena: ['', Validators.required],
      Rol: ['P', Validators.required]
    });
    this.detailPacienteForm = this.fb.group({
      Id: [''],
      Nombre: [''],
      CorreoElectronico: [''],
      Apellidos: [''],
      Edad: [''],
      Enfermedad: [''],
      Medicamento: [''],
    });

  }

  ngOnInit(): void {

    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const idString = params.get('id');
      if (idString !== null) {
        const id = parseInt(idString, 10);
        this.pacienteId = id;
        if (id === 0) {
          // Si el ID es 0, significa que es una nueva visita
          this.isNewPaciente = true;
          this.pacientePorId$ = of(null); // Establecer la visita a null para indicar que es nueva
        } else {
          // Si el ID no es 0, obtener la visita por el ID
          this.store.dispatch(PacienteDetailActions.GetPaciente({ id: id }));
          this.pacientePorId$ = this.store.select(selectedPacienteSelector);
        }
      } else {
        console.error('No hay id por parámetro');
      }
    });

    this.pacientePorId$ = this.store.select(selectedPacienteSelector);

    this.store.select(selectShowCrearErrorModal).pipe(takeUntil(this.destroy$)).subscribe((showErrorCrearModal: boolean) => {
      this.showErrorCrearModal = showErrorCrearModal;
    });

    this.store.select(selectShowEditarErrorModal).pipe(takeUntil(this.destroy$)).subscribe((showEditarErrorModal: boolean) => {
      this.showEditarErrorModal = showEditarErrorModal;
    });

    this.store.select(selectShowEditarSuccessModal).pipe(takeUntil(this.destroy$)).subscribe((showEditarSuccessModal: boolean) => {
      this.showEditarSuccessModal = showEditarSuccessModal;
    });

    this.store.select(selectShowCrearSuccessModal).pipe(takeUntil(this.destroy$)).subscribe((crearSuccessModal: boolean) => {
      this.crearSuccessModal = crearSuccessModal;
    });

    this.store.select(selectErrorMessage).pipe(takeUntil(this.destroy$)).subscribe((errorMessage: string) => {
      this.errorMessage = errorMessage;
    });

    this.pacientePorId$
      .pipe(takeUntil(this.destroy$))
      .subscribe((paciente: Paciente | null) => {
        if (paciente) {
          this.detailPacienteForm.patchValue(paciente);
          this.originalPacienteData = { ...paciente }; // Almacena una copia de los datos originales          
        }
      });

    this.cargando$ = this.store.select(selectCargando);
    this.error$ = this.store.select(selectErrorCarga);

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit() {
    if (this.isNewPaciente) {
      const newPacienteData = this.newPacienteForm.value;
      this.store.dispatch(PacienteDetailActions.CreatePaciente({ payload: newPacienteData }));
    } else {
      const updatedPacienteData = { ...this.detailPacienteForm.value }; 
      updatedPacienteData.Id = this.originalPacienteData.Id;
      updatedPacienteData.Contrasena = this.originalPacienteData.Contrasena; 
      updatedPacienteData.Rol = this.originalPacienteData.Rol;
      this.store.dispatch(PacienteDetailActions.UpdatePaciente({ paciente: updatedPacienteData }));
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
    this.store.dispatch(PacienteDetailActions.CloseErrorModal());
  }

  closeSuccessModal(): void {
    // Emitir una acción para cerrar el modal de success
    this.store.dispatch(PacienteDetailActions.CloseSuccessModal());
  }
}
