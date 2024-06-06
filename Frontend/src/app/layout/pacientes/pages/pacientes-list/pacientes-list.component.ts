import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, map, takeUntil, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import * as SelectPacientesList from '../../ngrx/selectors/pacientes-list.selectors'
import * as PacientesListActions from 'src/app/layout/pacientes/ngrx/actions/pacientes-list.actions';
import { Table } from 'primeng/table';
import { Paciente } from 'src/app/shared/models/entidades/paciente.model';
import { TableLazyLoadEvent } from 'primeng/table';


@Component({
  selector: 'app-pacientes-list',
  templateUrl: './pacientes-list.component.html',
  styleUrls: ['./pacientes-list.component.css']
})
export class PacientesListComponent implements OnInit, OnDestroy {

  cargando: boolean = true;
  pacientes: any;
  totalRecords!: number;
  error$: Observable<boolean> = new Observable();
  pacienteToDeleteId!: number | null;
  showConfirmationDialog: boolean = false;
  searchValue: string = '';
  @ViewChild('dt') dt: Table | undefined;
  showErrorModal!: boolean;
  showSuccessModal!: boolean;
  errorMessage!: string;
  destroy$: Subject<boolean> = new Subject<boolean>();    
  indiceActual = 0;
  cantidadPorPagina = 10;
  globalFilter: { value: string, matchMode: string } | null = null;

  constructor(private store: Store<AppState>, private router: Router, private location: Location) { }

  ngOnInit(): void {

    this.store.select(SelectPacientesList.selectCargando).pipe(takeUntil(this.destroy$)).subscribe(cargando => {
      this.cargando = cargando;
    });

    this.error$ = this.store.select(SelectPacientesList.selectErrorCarga)

    this.store.select(SelectPacientesList.selectShowErrorModal).pipe(takeUntil(this.destroy$)).subscribe(showErrorModal => {
      this.showErrorModal = showErrorModal;
    });

    this.store.select(SelectPacientesList.selectShowSuccessModal).pipe(takeUntil(this.destroy$)).subscribe(showSuccessModal => {
      this.showSuccessModal = showSuccessModal;
    });

    this.store.select(SelectPacientesList.selectErrorMessage).pipe(takeUntil(this.destroy$)).subscribe(errorMessage => {
      this.errorMessage = errorMessage;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
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

  showDeleteConfirmationDialog(id: number): void {
    this.showConfirmationDialog = true;
    this.pacienteToDeleteId = id;
  }

  onDeletePaciente(): void {
    this.showConfirmationDialog = false;
    this.store.dispatch(PacientesListActions.DeletePaciente({ id: this.pacienteToDeleteId! }));
  }

  goBack(): void {
    this.location.back();
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = '';
  }

  applyFilterGlobal(event: Event, matchMode: string) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    this.globalFilter = { value, matchMode };

    this.loadPacientesLazy({ filters: { global: this.globalFilter }, first: 0, rows: this.cantidadPorPagina });
  }

  closeModal(): void {
    this.store.dispatch(PacientesListActions.CloseModal());
    this.loadPacientesLazy({ first: 0, rows: this.cantidadPorPagina });
  }

  loadPacientesLazy(event: TableLazyLoadEvent) {    
    const page = event.first! / event.rows!;
    const size = event.rows!;
    let sortField: string = '';
    if (Array.isArray(event.sortField)) {
      sortField = event.sortField[0];
    } else {
      sortField = event.sortField || 'Id';
    }

    const sortOrder = event.sortOrder || 1;
    const filters = event.filters || {};

    this.store.dispatch(PacientesListActions.LoadingPacientes({ page, size, sortField, sortOrder, filters }));    
    this.store.select(SelectPacientesList.selectPacientesList).pipe(takeUntil(this.destroy$)).subscribe(pacientes => {
      this.pacientes = pacientes;
      if (pacientes && pacientes.length > 0) {
        this.totalRecords = pacientes[0].TotalRecords;
      } else {
        this.totalRecords = 0;
      }
    });
  }

}
