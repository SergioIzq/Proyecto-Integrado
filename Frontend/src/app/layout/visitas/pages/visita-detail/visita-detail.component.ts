import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Observable, Subject, of } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Visita } from 'src/app/shared/models/entidades/visita.model';
import * as VisitaDetailActions from '../../ngrx/actions/visita-detail.actions';
import * as SelectVisitaDetailActions from '../../ngrx/selectors/visita-detail.selectors';
import { takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';
import { EnfermedadService } from '../../../enfermedades/services/enfermedad.service';
import { Medicamento } from 'src/app/shared/models/entidades/medicamento.model';
import { MedicamentoService } from '../../../medicamentos/services/medicamento.service';
import { Paciente } from 'src/app/shared/models/entidades/paciente.model';
import { PacienteService } from 'src/app/layout/pacientes/services/paciente.service';
import { SintomaEnfermedad } from 'src/app/shared/models/entidades/sintomaEnfermedad.model';
import { SintomaEnfermedadService } from '../../services/sintomaEnfermedad.service';
import { Sintoma } from 'src/app/shared/models/entidades/sintoma.model';
import { SintomaService } from '../../services/sintoma.service';
import { AbstractControl } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { VisitaSintomaEnfermedad } from '../../../../shared/models/entidades/visitaSintomaEnfermedad.model';
import { MLService } from '../../services/ml.service';
import { Enfermedad } from 'src/app/shared/models/entidades/enfermedad.model';
import { Medico } from 'src/app/shared/models/entidades/medico.model';
import { MlData } from 'src/app/shared/models/entidades/ml.model';
import { VisitaService } from '../../services/visitas.service';
import { MedicoService } from 'src/app/layout/medicos/services/medico.service';
import { MenuItem, MessageService } from 'primeng/api';
import { VisitaSintomaEnfermedadService } from '../../services/visitaSintomaEnfermedad.service';


@Component({
  selector: 'app-visita-detail',
  templateUrl: './visita-detail.component.html',
  styleUrls: ['./visita-detail.component.css']
})
export class VisitaDetailComponent implements OnInit, OnDestroy {

  esLocale: any = {
    firstDayOfWeek: 1,
    dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
    dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
    dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
    monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
    monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
    today: 'Hoy',
    clear: 'Borrar',
    dateFormat: 'dd/mm/yy',
    weekHeader: 'Semana'
  };
  loading: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  visitaId: number = 0;
  visitaPorId$!: Observable<Visita | null>;
  cargando$!: Observable<boolean>;
  error$!: Observable<boolean>;
  detailVisitaForm: FormGroup;
  newVisitaForm: FormGroup;
  originalVisitaData!: Visita;
  enfermedades: any[] = [];
  pacientes!: Paciente[];
  medicamentos!: Medicamento[];
  sintomasEnfermedades!: SintomaEnfermedad[];
  sintomas!: Sintoma[];
  isNewVisita: boolean = false;
  errorMessage!: string;
  showErrorCrearModal: boolean = false;
  showEditarErrorModal: boolean = false;
  showEditarSuccessModal: boolean = false;
  crearSuccessModal: boolean = false;
  selectedEnfermedad!: string;
  selectedMedicamento!: string;
  sintomasSeleccionados: any[] = [];
  cantidadVisitas!: number;
  medicamentosId: number[] = [];
  visible: boolean = false;
  prediccion: any[] = [];
  medicamentoSeleccionado: string = '';
  sintomasBuenosSeleccionados: any[] = [];
  mostrarMedicamento: boolean = false;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private enfermedadService: EnfermedadService,
    private medicamentoService: MedicamentoService,
    private pacienteService: PacienteService,
    private sintomaEnfermedadService: SintomaEnfermedadService,
    private sintomaService: SintomaService,
    private cdr: ChangeDetectorRef,
    private mlService: MLService,
    private medicoService: MedicoService,
    private visitaService: VisitaService,
    private messageService: MessageService,
    private visitaSintomaEnfermedadService: VisitaSintomaEnfermedadService
  ) {
    this.newVisitaForm = this.fb.group({
      Id: [0],
      Paciente: this.fb.group({
        Id: [0],
        Nombre: [''],
        Apellidos: [''],
        Edad: [0],
        CorreoElectronico: ['', Validators.required],
        Contrasena: [''],
        Rol: ['P']
      }),
      Medico: this.fb.group({
        Id: [0],
        Nombre: [''],
        Apellidos: [''],
        Especialidad: [''],
        HorarioLaboral: [''],
        CorreoElectronico: ['', Validators.required],
        Contrasena: [''],
        Rol: ['M']
      }),
      Medicamento: this.fb.group({
        Id: [0],
        Nombre: [''],
        Tipo: [''],
        Descripcion: [''],
        Precio: [0],
        FamiliaMedicamento: [0],
      }),
      Enfermedad: this.fb.group({
        Id: [0],
        Nombre: ['', Validators.required],
        IdFamiliaEnfermedad: [0],
      }),
      cantidadVisitas: 0,
      Sintomas: this.fb.array([]),
      Motivo: [''],
      FechaVisita: ['', Validators.required],
    });

    this.detailVisitaForm = this.fb.group({
      Id: [0],
      Paciente: this.fb.group({
        Id: [0],
        CorreoElectronico: [''],
        Nombre: [''],
        Apellidos: [''],
        Contrasena: [''],
        Edad: [''],
        Rol: ['P']
      }),
      Medico: this.fb.group({
        Id: [0],
        CorreoElectronico: [''],
        Nombre: [''],
        Apellidos: [''],
        Especialidad: [''],
        Rol: ['M'],
        Contrasena: [''],
        HorarioLaboral: ['']
      }),
      Medicamento: this.fb.group({
        Id: [0],
        Nombre: [''],
        Tipo: [''],
        Descripcion: [''],
        IdFamiliaMedicamento: [0]
      }),
      Enfermedad: this.fb.group({
        Id: [0],
        Nombre: ['', Validators.required],
        IdFamiliaEnfermedad: [0],
      }),
      Sintomas: this.fb.array([]),
      Motivo: [''],
      FechaVisita: ['']
    });
  }

  get sintomasFormArray() {
    return this.detailVisitaForm.get('Sintomas') as FormArray;
  }

  private addSintomasCheckboxes() {
    this.sintomas.forEach(sintoma => {
      this.sintomasFormArray.push(this.fb.control(false));
    });
  }


  ngOnInit(): void {

    this.obtenerTodasEnfermedades();

    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const idString = params.get('id');
      if (idString !== null) {
        const id = parseInt(idString, 10);
        this.visitaId = id;
        if (id === 0) {
          this.isNewVisita = true;
          this.visitaPorId$ = of(null);
        } else {
          this.store.dispatch(VisitaDetailActions.GetVisita({ id: id }));
          this.visitaPorId$ = this.store.select(SelectVisitaDetailActions.selectedVisitaSelector);
        }
      } else {
        console.error('No hay id por parámetro');
      }
    });

    this.cargando$ = this.store.select(SelectVisitaDetailActions.selectCargando);
    this.error$ = this.store.select(SelectVisitaDetailActions.selectErrorCarga);

    this.enfermedadService.getAll().pipe(takeUntil(this.destroy$)).subscribe(enfermedades => {
      this.enfermedades = enfermedades;
    });

    this.medicamentoService.getAll().pipe(takeUntil(this.destroy$)).subscribe(medicamentos => {
      this.medicamentos = medicamentos;
    });

    this.sintomaEnfermedadService.getAll().pipe(takeUntil(this.destroy$)).subscribe(sintomasEnfermedades => {
      this.sintomasEnfermedades = sintomasEnfermedades;
    });

    this.visitaPorId$.pipe(takeUntil(this.destroy$)).subscribe((visita: Visita | null) => {
      if (visita) {
        this.detailVisitaForm.patchValue(visita);
        this.originalVisitaData = { ...visita };
        this.selectedEnfermedad = this.enfermedades.find(enfermedad => enfermedad.Nombre === visita.Enfermedad.Nombre);
        this.selectedMedicamento = visita.Medicamento.Nombre;
      }
    });

    this.sintomaService.getAll().pipe(takeUntil(this.destroy$)).subscribe(sintomas => {
      this.sintomas = sintomas;

      this.addSintomasCheckboxes();
      this.visitaSintomaEnfermedadService.getAll().pipe(takeUntil(this.destroy$)).subscribe(sintomas => {
        this.setSelectedSintomas(sintomas);
      })

    });

    this.pacienteService.getAll().pipe(takeUntil(this.destroy$)).subscribe(pacientes => {
      this.pacientes = pacientes;
    });

    this.store.select(SelectVisitaDetailActions.selectShowCrearErrorModal).pipe(takeUntil(this.destroy$)).subscribe(showErrorCrearModal => {
      this.showErrorCrearModal = showErrorCrearModal;
    });

    this.store.select(SelectVisitaDetailActions.selectShowEditarErrorModal).pipe(takeUntil(this.destroy$)).subscribe(showEditarErrorModal => {
      this.showEditarErrorModal = showEditarErrorModal;
    });

    this.store.select(SelectVisitaDetailActions.selectShowEditarSuccessModal).pipe(takeUntil(this.destroy$)).subscribe(showEditarSuccessModal => {
      this.showEditarSuccessModal = showEditarSuccessModal;
    });

    this.store.select(SelectVisitaDetailActions.selectShowCrearSuccessModal).pipe(takeUntil(this.destroy$)).subscribe(crearSuccessModal => {
      this.crearSuccessModal = crearSuccessModal;
    });

    this.store.select(SelectVisitaDetailActions.selectErrorMessage).pipe(takeUntil(this.destroy$)).subscribe(errorMessage => {
      this.errorMessage = errorMessage;
    });

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit() {
    if (this.isNewVisita) {
      // Obtener los datos del formulario
      const formData = this.newVisitaForm.value;
      console.log(formData)
      // Suponiendo que tienes un array de los IDs de los síntomas seleccionados
      const sintomasSeleccionadosIds = this.getSintomasSeleccionados('n')
        .map((value, index) => value ? index : +1) // Mapear valores verdaderos a sus índices
        .filter(index => index !== -1); // Filtrar solo los índices diferentes de -1

      const formattedData = {
        Id: 0,
        Paciente: {
          Id: 0,
          CorreoElectronico: formData.Paciente.CorreoElectronico,
          Nombre: '',
          Apellidos: '',
          Edad: 0,
          Contrasena: '',
          Rol: 'P'
        },
        Medico: {
          Id: 0,
          CorreoElectronico: formData.Medico.CorreoElectronico,
          Nombre: '',
          Apellidos: '',
          Especialidad: '',
          Rol: 'M',
          HorarioLaboral: '',
          Contrasena: ''
        },
        Enfermedad:
          formData.Enfermedad.Nombre,
        Medicamento: {
          Id: 0,
          Nombre: this.mostrarMedicamento ? formData.Medicamento.Nombre : this.medicamentoSeleccionado,
          Descripcion: '',
          Tipo: '',
          Precio: 0
        },
        Motivo: formData.Motivo,
        FechaVisita: formData.FechaVisita
      };

      // Hacer una solicitud para obtener los IDs de SintomaEnfermedad por los IDs de los síntomas seleccionados
      this.sintomaEnfermedadService.obtenerIdsSintomaEnfermedadPorSintomas(this.sintomasBuenosSeleccionados).subscribe(ids => {
        // Crear un array para almacenar las instancias de visitaSintomaEnfermedad
        const visitasSintomaEnfermedad = [];
        console.log(this.sintomasBuenosSeleccionados)
        // Obtener la cantidad de instancias de sintomaEnfermedadonSintomaChange
        const cantidadSintomaEnfermedad = ids.length;
        // Asignar el mismo Id_Visita a todas las instancias de visitaSintomaEnfermedad
        for (let i = 0; i < cantidadSintomaEnfermedad; i++) {
          const visitaSintomaEnfermedad = {
            Id: 0,
            Id_SintomaEnfermedad: ids[i],
            Id_Visita: 0
          };

          // Agregar la instancia de visitaSintomaEnfermedad al array
          visitasSintomaEnfermedad.push(visitaSintomaEnfermedad);
        }
        this.store.dispatch(VisitaDetailActions.CreateVisita({ payload: formattedData, visitaSintomaEnfermedad: visitasSintomaEnfermedad }));
      });

    } else {

      // Hacer una solicitud para obtener los IDs de SintomaEnfermedad por los IDs de los síntomas seleccionados
      this.sintomaEnfermedadService.obtenerIdsSintomaEnfermedadPorSintomas(this.sintomasSeleccionados).subscribe(ids => {

        const formValues = this.detailVisitaForm.value;
        const formattedVisitaData: Partial<Visita> = {
          Id: this.originalVisitaData.Id,
          Paciente: {
            Id: this.originalVisitaData.Paciente.Id,
            CorreoElectronico: formValues.Paciente.CorreoElectronico,
          } as Paciente,
          Medico: {
            Id: this.originalVisitaData.Medico.Id,
            CorreoElectronico: formValues.Medico.CorreoElectronico,
          } as Medico,
          Enfermedad: {
            Id: formValues.Enfermedad.Id,
            Nombre: formValues.Enfermedad.Nombre,
          } as Enfermedad,
          Medicamento: {
            Id: this.originalVisitaData.Medicamento.Id!,
            Nombre: formValues.Medicamento.Nombre!,
            IdFamiliaMedicamento: formValues.Medicamento.IdFamiliaMedicamento!
          } as Medicamento,
          Motivo: formValues.Motivo,
          FechaVisita: formValues.FechaVisita.toLocaleString('es') // Formatear en español
        };

        // Crear un array para almacenar las instancias de visitaSintomaEnfermedad


        // Obtener la cantidad de instancias de sintomaEnfermedad        
        const visitasSintomaEnfermedad = [];

        for (let i = 0; i < this.sintomasBuenosSeleccionados.length; i++) {
          const visitaSintomaEnfermedad = {
            Id: this.originalVisitaData.Sintomas[0].Id,
            Id_SintomaEnfermedad: this.sintomasBuenosSeleccionados[i],
            Id_Visita: this.originalVisitaData.Id
          };
          visitasSintomaEnfermedad.push(visitaSintomaEnfermedad);
        }
        this.store.dispatch(VisitaDetailActions.UpdateVisita({ visita: formattedVisitaData, visitaSintomaEnfermedad: visitasSintomaEnfermedad }));
      });
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

    mes = mes < 10 ? '0' + mes : mes;
    dia = dia < 10 ? '0' + dia : dia;
    hora = hora < 10 ? '0' + hora : hora;
    minutos = minutos < 10 ? '0' + minutos : minutos;

    return `${anio}-${mes}-${dia}T${hora}:${minutos}`;
  }

  closeModal(): void {
    this.store.dispatch(VisitaDetailActions.CloseModal());
  }

  obtenerTodasEnfermedades(): void {
    this.sintomaService.getAll().subscribe(
      sintomasEnfermedades => {
        // Obtener síntomas únicos
        const sintomasUnicos = Array.from(new Set(sintomasEnfermedades.map(se => se.Id)));
        sintomasUnicos.sort((a, b) => a - b);

        // Llamar a la API para obtener todos los detalles de los síntomas al mismo tiempo
        this.sintomaEnfermedadService.obtenerDetallesSintomas(sintomasUnicos).subscribe(
          sintomas => {
            this.sintomas = sintomas; // Asignar los síntomas obtenidos

            // Crear el FormArray para los síntomas
            const sintomasFormArray = this.fb.array(
              sintomasUnicos.map(sintomaId => this.fb.control(false))
            );

            this.newVisitaForm.setControl('Sintomas', sintomasFormArray);

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

  onSintomaChange(event: any, form: string): void {
    const sintomaId = event.target.value;
    const isChecked = event.target.checked;

    let sintomasSeleccionados = this.getSintomasSeleccionados(form);

    if (isChecked && !sintomasSeleccionados.includes(sintomaId)) {
      sintomasSeleccionados.push(sintomaId);
    } else if (!isChecked && sintomasSeleccionados.includes(sintomaId)) {
      sintomasSeleccionados = sintomasSeleccionados.filter(id => id !== sintomaId);
    }

    this.actualizarEnfermedadesCompatibles(sintomasSeleccionados);
  }

  getSintomasSeleccionados(form: string): number[] {
    if (form == 'n') {
      const sintomasControl = this.newVisitaForm.get('Sintomas');
      return sintomasControl?.value || [];
    } else {
      const sintomasControl = this.detailVisitaForm.get('Sintomas');
      return sintomasControl?.value || [];
    }
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
    console.log(sintomasSeleccionadosIds)
    this.sintomasBuenosSeleccionados = sintomasSeleccionadosIds
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

  private setSelectedSintomas(selectedSintomas: VisitaSintomaEnfermedad[]): void {
    this.sintomas.forEach((sintoma, index) => {
      const isSelected = selectedSintomas.some(selected => {
        // Ensure both Id_Visita and Id match for selection
        return selected.Id_Visita === this.originalVisitaData.Id && selected.Id_SintomaEnfermedad === sintoma.Id;
      });

      (this.sintomasFormArray.at(index) as AbstractControl).setValue(isSelected);
    });

    this.cdr.detectChanges();
  }



  makePrediction() {
    const formValues = this.newVisitaForm.value;
    this.visible = true;
    this.getPacienteId(formValues.Paciente.CorreoElectronico).then(pacienteId => {
      this.getMedicoId(formValues.Medico.CorreoElectronico).then(medicoId => {
        this.getEnfermedadId(formValues.Enfermedad.Nombre.Nombre).then(enfermedadId => {
          const dataId: any = {
            FechaVisita: formValues.FechaVisita,
            PacienteId: pacienteId,
            MedicoId: medicoId,
            EnfermedadId: enfermedadId,
            CorreoMedico: formValues.Medico.CorreoElectronico,
            CorreoPaciente: formValues.Paciente.CorreoElectronico,
            EnfermedadNombre: formValues.Enfermedad.Nombre.Nombre,
          };

          this.mlService.regressionPredictionAll(dataId).subscribe(
            (res: any[]) => {
              this.prediccion = res;
              this.mostrarMedicamento = false;
            },
            error => {
              this.mostrarMedicamento = true;
              this.visible = false;
              this.messageService.add({ severity: 'error', summary: 'Error', detail: `Se necesitan mínimo 100 visitas para poder empezar a hacer predicciones` });
              console.error('Se necesita un mínimo de 10 visitas:', error);
            }
          );

        });
      });
    });
  }

  getPacienteId(correo: string): Promise<number> {
    return this.pacienteService.getIdByCorreo(correo).toPromise();
  }

  getMedicoId(correo: string): Promise<number> {
    return this.medicoService.getIdByCorreo(correo).toPromise();
  }

  getEnfermedadId(nombre: string): Promise<number> {
    return this.enfermedadService.getIdByNombre(nombre).toPromise();
  }

  getMedicamentoId(nombre: string): Promise<number> {
    return this.medicamentoService.getIdByNombre(nombre).toPromise();
  }

  enviarVisitas(cantidadVisitas: string) {
    const cantidad = parseInt(cantidadVisitas);
    if (!isNaN(cantidad) && cantidad > 0) {
      this.loading = true;
      this.visitaService.seedVisitas(cantidad)
        .subscribe((response: any) => {
          this.messageService.add({ severity: 'success', summary: 'Visitas creadas', detail: response.message });
          this.loading = false; 
        }, error => {
          console.error('Error al crear visitas:', error);
          const errorMessage = error.error ? error.error.message : 'Ocurrió un error al crear visitas.';
          this.messageService.add({ severity: 'error', summary: 'Fallo al generar visitas', detail: errorMessage });
          this.loading = false;
        });
    } else {
      this.messageService.add({ severity: 'info', summary: 'Cantidad de visitas inválida', detail: 'Inserte un número mayor que 0' });
    }
  }

  selectMedicamento(predict: any) {
    this.medicamentoSeleccionado = predict.medicamentoNombre;
    console.log("Medicamento seleccionado:", predict);
    this.prediccion = [];
    this.visible = false;
    this.messageService.add({ severity: 'info', summary: 'Info', detail: `Ha seleccionado ${predict.medicamentoNombre} como medicamento` });
  }

}