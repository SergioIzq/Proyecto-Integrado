import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Observable, Subject, of } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Enfermedad } from 'src/app/shared/models/entidades/enfermedad.model';
import { selectCargando, selectErrorCarga, selectErrorMessage, selectShowCrearSuccessModal, selectShowEditarSuccessModal, selectedEnfermedadSelector } from '../../ngrx/selectors/enfermedad-detail.selectors';
import * as EnfermedadDetailActions from '../../ngrx/actions/enfermedad-detail.actions';
import { takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';
import { AbstractControl } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { selectShowCrearErrorModal } from '../../ngrx/selectors/enfermedad-detail.selectors';
import { selectShowEditarErrorModal } from '../../ngrx/selectors/enfermedad-detail.selectors';
import { SintomaEnfermedadService } from '../../../visitas/services/sintomaEnfermedad.service';

@Component({
  selector: 'app-enfermedad-detail',
  templateUrl: './enfermedad-detail.component.html',
  styleUrls: ['./enfermedad-detail.component.css']
})
export class EnfermedadDetailComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  enfermedadId: number = 0;
  enfermedadPorId$!: Observable<Enfermedad | null>;
  cargando$!: Observable<boolean>;
  error$!: Observable<boolean>;
  detailEnfermedadForm: FormGroup;
  originalEnfermedadData!: Enfermedad;
  isNewEnfermedad: boolean = false;
  newEnfermedadForm!: FormGroup;
  showErrorCrearModal: boolean = false;
  showCrearSuccessModal: boolean = false;
  showEditarErrorModal: boolean = false;
  showEditarSuccessModal: boolean = false;
  crearSuccessModal: boolean = false;
  errorMessage!: string;
  selectedEnfermedad!: string;
  sintomas: any = [];
  enfermedades: any = [];

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private sintomaEnfermedadService: SintomaEnfermedadService,
    private cdr: ChangeDetectorRef
  ) {

    this.newEnfermedadForm = this.fb.group({
      Id: [0],
      Nombre: ['', Validators.required],
      FamiliaEnfermedad: this.fb.group({
        Id: [0],
        Nombre: [''],
        Tipo: [''],
        Descripcion: ['']
      }),
      Sintomas: this.fb.array([]),
      SintomaEnfermedad: this.fb.group({
        Id: [0],
        IdSintoma: [0],
        IdEnfermedad: [0]
      })
    });
    this.detailEnfermedadForm = this.fb.group({
      Id: [0],
      Nombre: ['', Validators.required],
      FamiliaEnfermedad: this.fb.group({
        Id: [0],
        Nombre: [''],
        Tipo: [''],
        Descripcion: ['']
      }),
      Sintomas: this.fb.array([]),
      SintomaEnfermedad: this.fb.group({
        Id: [0],
        IdSintoma: [0],
        IdEnfermedad: [0]
      })
    });

  }

  ngOnInit(): void {

    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const idString = params.get('id');
      if (idString !== null) {
        const id = parseInt(idString, 10);
        this.enfermedadId = id;
        if (id === 0) {
          // Si el ID es 0, significa que es una nueva visita
          this.isNewEnfermedad = true;
          this.enfermedadPorId$ = of(null); // Establecer la visita a null para indicar que es nueva
        } else {
          // Si el ID no es 0, obtener la visita por el ID
          this.store.dispatch(EnfermedadDetailActions.GetEnfermedad({ id: id }));
          this.enfermedadPorId$.pipe(takeUntil(this.destroy$)).subscribe((enfermedad: Enfermedad | null) => {
            if (enfermedad) {
              this.detailEnfermedadForm.patchValue(enfermedad);
              this.originalEnfermedadData = { ...enfermedad };
              this.selectedEnfermedad = enfermedad.Nombre;
            }
          });
        }
      } else {
        console.error('No hay id por parámetro');
      }
    });

    this.enfermedadPorId$ = this.store.select(selectedEnfermedadSelector);

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

    this.enfermedadPorId$
      .pipe(takeUntil(this.destroy$))
      .subscribe((enfermedad: Enfermedad | null) => {
        if (enfermedad) {
          this.detailEnfermedadForm.patchValue(enfermedad);
          this.originalEnfermedadData = { ...enfermedad }; // Almacena una copia de los datos originales          
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
    if (this.isNewEnfermedad) {
      const newEnfermedadData = this.newEnfermedadForm.value;
      this.store.dispatch(EnfermedadDetailActions.CreateEnfermedad({ payload: newEnfermedadData }));
    } else {
      const updatedEnfermedadData = { ...this.detailEnfermedadForm.value };
      updatedEnfermedadData.Id = this.originalEnfermedadData.Id;
      updatedEnfermedadData.IdFamiliaEnfermedad = this.originalEnfermedadData.IdFamiliaEnfermedad;
      this.store.dispatch(EnfermedadDetailActions.UpdateEnfermedad({ enfermedad: updatedEnfermedadData }));
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

  closeModal(): void {
    // Emitir una acción para cerrar el modal de error
    this.store.dispatch(EnfermedadDetailActions.CloseModal());
  }

  obtenerTodasEnfermedades(): void {
    this.sintomaEnfermedadService.getAll().subscribe(
      sintomasEnfermedades => {
        // Obtener síntomas únicos
        const sintomasUnicos = Array.from(new Set(sintomasEnfermedades.map(se => se.IdSintoma)));

        // Llamar a la API para obtener todos los detalles de los síntomas al mismo tiempo
        this.sintomaEnfermedadService.obtenerDetallesSintomas(sintomasUnicos).subscribe(
          sintomas => {
            this.sintomas = sintomas; // Asignar los síntomas obtenidos

            // Crear el FormArray para los síntomas
            const sintomasFormArray = this.fb.array(
              sintomasUnicos.map(sintomaId => this.fb.control(false))
            );

            // Establecer el FormArray en el formulario
            this.newEnfermedadForm.setControl('Sintomas', sintomasFormArray);

            // Forzar detección de cambios
            this.cdr.detectChanges();
          },
          error => {
            console.error("Error al obtener detalles de los síntomas:", error);
          }
        );
      },
      error => {
        console.error("Error al obtener los síntomas y enfermedades:", error);
      }
    );
  }

  onSintomaChange(event: any): void {
    const sintomaId = event.target.value;
    const isChecked = event.target.checked;

    let sintomasSeleccionados = this.getSintomasSeleccionados();

    if (isChecked && !sintomasSeleccionados.includes(sintomaId)) {
      sintomasSeleccionados.push(sintomaId);
    } else if (!isChecked && sintomasSeleccionados.includes(sintomaId)) {
      sintomasSeleccionados = sintomasSeleccionados.filter(id => id !== sintomaId);
    }

    this.actualizarEnfermedadesCompatibles(sintomasSeleccionados);
  }

  getSintomasSeleccionados(): number[] {
    const sintomasControl = this.newEnfermedadForm.get('Sintomas');
    return sintomasControl?.value || [];
  }

  actualizarEnfermedadesCompatibles(sintomasSeleccionados: any[]): void {
    // Limpiar el arreglo de enfermedades antes de agregar nuevas
    this.enfermedades = [];

    // Verificar si hay síntomas seleccionados
    if (sintomasSeleccionados.length === 0) {
      // No hay síntomas seleccionados, no se necesita llamar a la API
      return;
    }

    // Filtrar solo los IDs de los síntomas seleccionados
    const sintomasSeleccionadosIds = sintomasSeleccionados
      .map((isSelected, index) => isSelected === true ? index + 1 : false) // Convertir booleanos a números
      .filter(id => typeof id === 'number'); // Filtrar los IDs que no son falsos

    // Llamar a la API con los IDs de síntomas seleccionados para obtener las enfermedades correspondientes
    this.sintomaEnfermedadService.getEnfermedadesPorSintomas(sintomasSeleccionadosIds as number[]).subscribe(
      enfermedades => {
        // Agregar todas las enfermedades obtenidas
        this.enfermedades.push(...enfermedades);
        // Eliminar duplicados
        this.enfermedades = this.eliminarDuplicados(this.enfermedades);
        // Forzar detección de cambios
        this.cdr.detectChanges();
      },
      error => {
        console.error("Error al obtener enfermedades por síntomas:", error);
      }
    );
  }

  eliminarDuplicados(array: any[]): any[] {
    const uniqueEnfermedades = array.reduce((unique: any[], enfermedad: any) => {
      const enfermedadExistente = unique.find((e: any) => e.Nombre === enfermedad.Nombre && e.id === enfermedad.id);
      if (!enfermedadExistente) {
        unique.push(enfermedad);
      }
      return unique;
    }, []);
    return uniqueEnfermedades;
  }

  getFormArrayControls(formGroup: FormGroup, arrayName: string): AbstractControl[] {
    const formArray = formGroup.get(arrayName) as FormArray;
    return formArray.controls;
  }

}
