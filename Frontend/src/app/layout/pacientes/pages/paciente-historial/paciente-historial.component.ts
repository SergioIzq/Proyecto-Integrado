import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import * as PacienteHistorialActions from '../../ngrx/actions/paciente-historial.actions';
import * as PacienteSelector from '../../ngrx/selectors/paciente-historial.selectors'
import { Location } from '@angular/common';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { Paciente } from 'src/app/shared/models/entidades/paciente.model';
import { take, takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-paciente-historial',
  templateUrl: './paciente-historial.component.html',
  styleUrls: ['./paciente-historial.component.css'],
})
export class PacienteHistorialComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  cargando$!: Observable<boolean>;
  userId!: number;
  paciente!: Paciente | null;
  error$!: Observable<boolean>;
  searchValue: string = '';
  pacientes$!: Observable<Paciente>
  showConfirmationDialog: boolean = false;
  @ViewChild('dt') dt: Table | undefined;
  pacienteToDeleteId: number | null = null;
  errorMessage!: string;
  visitasTransformadas: any[] = [];

  constructor(
    private store: Store<AppState>,
    private location: Location,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.store.dispatch(PacienteHistorialActions.GetUserId());

    this.store.select(PacienteSelector.userIdSelector).pipe(takeUntil(this.destroy$)).subscribe((userId: number) => {
      this.userId = userId;      
    });    

    this.store.dispatch(PacienteHistorialActions.GetPaciente({ id: this.userId }));

    this.store.select(PacienteSelector.selectedPacienteSelector).pipe(takeUntil(this.destroy$)).subscribe((paciente: Paciente | null) => {
      if (paciente) {
        this.paciente = paciente;
        // Aplicar la transformación de visitas al paciente
        this.visitasTransformadas = this.transformarVisitas(paciente);
      }
    });


    this.cargando$ = this.store.select(PacienteSelector.selectCargando);
    this.error$ = this.store.select(PacienteSelector.selectErrorCarga);

    this.store.select(PacienteSelector.selectErrorMessage).pipe(takeUntil(this.destroy$)).subscribe((errorMessage: string) => {
      this.errorMessage = errorMessage;
    });

  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  transformarVisitas(paciente: Paciente | null): any[] {
    if (!paciente || !paciente.ListaVisitas) {
      return []
    } else {
      return paciente.ListaVisitas.map((visitaDetalle) => ({
        Id: paciente.Id,
        IdVisita: visitaDetalle.Id,
        Nombre: paciente.Nombre,
        Apellidos: paciente.Apellidos,
        Edad: paciente.Edad,
        CorreoPaciente: paciente.CorreoElectronico,
        FechaVisita: visitaDetalle.FechaVisita,
        Enfermedad: visitaDetalle.Enfermedad.Nombre,
        Medicamento: visitaDetalle.Medicamento.Nombre,
        Medico: visitaDetalle.Medico.Nombre,
        CorreoMedico: visitaDetalle.Medico.CorreoElectronico
      }));
    }
  }

  // Método para mostrar el diálogo de confirmación antes de eliminar una visita
  showDeleteConfirmationDialog(id: number) {
    this.pacienteToDeleteId = id;
    this.showConfirmationDialog = true;
  }
  getDialogWidth(): string {
    const maxWidthSmallScreens = 300;

    // Obtener el ancho de la ventana del navegador
    const windowWidth = window.innerWidth;

    // Si la ventana es menor que un cierto tamaño, devuelve el ancho máximo para pantallas pequeñas
    if (windowWidth < 576) {
      return `${maxWidthSmallScreens}px`;
    }

    // Si no, devuelve el ancho predeterminado del diálogo
    return '25rem';
  }

  onDeleteConfirmed() {
    this.showConfirmationDialog = false;
    // Verifica si se ha seleccionado una visita para eliminar
    if (this.pacienteToDeleteId !== null) {
      this.store.dispatch(PacienteHistorialActions.DeleteVisita({ id: this.pacienteToDeleteId }));
      // Limpia el ID de la visita a eliminar
      this.pacienteToDeleteId = null;
      window.location.reload();
    }
  }

  goBack(): void {
    this.location.back();
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = '';
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

}
