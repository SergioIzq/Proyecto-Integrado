import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, map, takeUntil, Subject } from 'rxjs';
import * as SelectMedicosList from '../../ngrx/selectors/medicos-list.selectors'
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import * as MedicosListActions from 'src/app/layout/medicos/ngrx/actions/medicos-list.actions';
import { Table } from 'primeng/table';
import { ViewChild } from '@angular/core';
import { TableLazyLoadEvent } from 'primeng/table';

@Component({
  selector: 'app-medicos-list',
  templateUrl: './medicos-list.component.html',
  styleUrls: ['./medicos-list.component.css']
})
export class MedicosListComponent implements OnInit, OnDestroy {

  cargando: boolean = true;
  error$: Observable<boolean> = new Observable();
  medicoToDeleteId!: number | null;
  showConfirmationDialog: boolean = false;
  searchValue: string = '';
  showErrorModal!: boolean;
  showSuccessModal!: boolean;
  errorMessage!: string;
  destroy$: Subject<boolean> = new Subject<boolean>();
  @ViewChild('dt') dt: Table | undefined;
  loading: boolean = false;
  indiceActual = 0;
  cantidadPorPagina = 10;
  medicos: any;
  totalRecords!: number;
  globalFilter: { value: string, matchMode: string } | null = null;

  constructor(private store: Store<AppState>, private router: Router, private location: Location) { }

  ngOnInit(): void {

    this.store.select(SelectMedicosList.selectCargando).pipe(takeUntil(this.destroy$)).subscribe(cargando => {
      this.cargando = cargando;
    });

    this.error$ = this.store.select(SelectMedicosList.selectErrorCarga);

    this.store.select(SelectMedicosList.selectShowErrorModal).pipe(takeUntil(this.destroy$)).subscribe(showErrorModal => {
      this.showErrorModal = showErrorModal;
    });

    this.store.select(SelectMedicosList.selectShowSuccessModal).pipe(takeUntil(this.destroy$)).subscribe(showSuccessModal => {
      this.showSuccessModal = showSuccessModal;
    });

    this.store.select(SelectMedicosList.selectErrorMessage).pipe(takeUntil(this.destroy$)).subscribe(errorMessage => {
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

  goBack(): void {
    this.location.back();
  }

  clear(table: Table): void {
    table.clear();
    this.searchValue = '';
  }


  applyFilterGlobal(event: Event, matchMode: string) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    this.globalFilter = { value, matchMode };

    this.loadMedicosLazy({ filters: { global: this.globalFilter }, first: 0, rows: this.cantidadPorPagina });
  }

  showDeleteConfirmationDialog(id: number): void {
    this.showConfirmationDialog = true;
    this.medicoToDeleteId = id;
  }

  onDeleteMedico(): void {
    this.showConfirmationDialog = false;
    this.store.dispatch(MedicosListActions.DeleteMedico({ id: this.medicoToDeleteId! }));
  }

  closeModal(): void {
    this.store.dispatch(MedicosListActions.CloseModal());
    this.loadMedicosLazy({ first: 0, rows: this.cantidadPorPagina });
  }

  loadMedicosLazy(event: TableLazyLoadEvent) {
    this.loading = true;
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

    this.store.dispatch(MedicosListActions.LoadingMedicos({ page, size, sortField, sortOrder, filters }));
    this.loading = false;
    this.store.select(SelectMedicosList.selectMedicosList).pipe(takeUntil(this.destroy$)).subscribe(medicos => {
      this.medicos = medicos;
      if (medicos && medicos.length > 0) {
        this.totalRecords = medicos[0].TotalRecords;
      } else {
        this.totalRecords = 0;
      }
      this.loading = false;
    });
  }

}
