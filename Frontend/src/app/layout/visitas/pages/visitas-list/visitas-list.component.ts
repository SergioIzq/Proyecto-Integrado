import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import * as VisitasListActions from 'src/app/layout/visitas/ngrx/actions/visitas-list.actions';
import { Location } from '@angular/common';
import { Table, TableLazyLoadEvent } from 'primeng/table';
import { takeUntil } from 'rxjs';
import * as SelectVisitasList from '../../ngrx/selectors/visitas-list.selectors';
import { VisitaService } from '../../services/visitas.service';

@Component({
  selector: 'app-visitas-list',
  templateUrl: './visitas-list.component.html',
  styleUrls: ['./visitas-list.component.css'],
})
export class VisitasListComponent implements OnInit, OnDestroy {

  cargando: boolean = true;
  visitas: any;
  error$!: Observable<boolean>;
  searchValue: string = '';
  showConfirmationDialog: boolean = false;
  @ViewChild('dt') dt: Table | undefined;
  visitaToDeleteId: number | null = null;
  showErrorModal!: boolean;
  showSuccessModal!: boolean;
  errorMessage!: string;
  destroy$: Subject<boolean> = new Subject<boolean>();
  indiceActual = 0;
  cantidadPorPagina = 10;
  totalRecords!: number;  
  globalFilter: { value: string, matchMode: string } | null = null;

  constructor(
    private store: Store<AppState>,
    private location: Location,
  ) { }

  ngOnInit(): void {    

    this.store.select(SelectVisitasList.selectCargando).pipe(takeUntil(this.destroy$)).subscribe(cargando => {
      this.cargando = cargando;
    });

    this.error$ = this.store.select(SelectVisitasList.selectErrorCarga);

    this.store.select(SelectVisitasList.selectShowErrorModal).pipe(takeUntil(this.destroy$)).subscribe(showErrorModal => {
      this.showErrorModal = showErrorModal;
    });

    this.store.select(SelectVisitasList.selectShowSuccessModal).pipe(takeUntil(this.destroy$)).subscribe(showSuccessModal => {
      this.showSuccessModal = showSuccessModal;
    });

    this.store.select(SelectVisitasList.selectErrorMessage).pipe(takeUntil(this.destroy$)).subscribe(errorMessage => {
      this.errorMessage = errorMessage;
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  goBack(): void {
    this.location.back();
  }

  clear(table: any) {
    table.clear();
    this.searchValue = '';
    this.globalFilter = null;  // Limpiar filtro global
    this.loadVisitasLazy({ first: 0, rows: this.cantidadPorPagina });
  }

  getDialogWidth(): string {
    const maxWidthSmallScreens = 300;
    const windowWidth = window.innerWidth;
    return windowWidth < 576 ? `${maxWidthSmallScreens}px` : '25rem';
  }

  onDeleteVisita() {
    this.showConfirmationDialog = false;
    if (this.visitaToDeleteId !== null) {
      this.store.dispatch(VisitasListActions.DeleteVisita({ id: this.visitaToDeleteId }));
      this.visitaToDeleteId = null;
    }
  }

  applyFilterGlobal(event: Event, matchMode: string) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    this.globalFilter = { value, matchMode };

    this.loadVisitasLazy({ filters: { global: this.globalFilter }, first: 0, rows: this.cantidadPorPagina });
  }

  showDeleteConfirmationDialog(id: number) {
    this.showConfirmationDialog = true;
    this.visitaToDeleteId = id;
  }

  closeModal(): void {
    this.store.dispatch(VisitasListActions.CloseModal());
    this.loadVisitasLazy({ first: 0, rows: this.cantidadPorPagina });
  }

  loadVisitasLazy(event: TableLazyLoadEvent) {    
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

    this.store.dispatch(VisitasListActions.LoadingVisitas({ page, size, sortField, sortOrder, filters }));

    this.store.select(SelectVisitasList.selectVisitasList)
      .pipe(takeUntil(this.destroy$))
      .subscribe(visitas => {
        this.visitas = visitas;
        if (visitas && visitas.length > 0) {
          this.totalRecords = visitas[0].TotalRecords;
        } else {
          this.totalRecords = 0;
        }        
      });
  }

}
