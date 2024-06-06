import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, combineLatest, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { selectErrorCarga, selectEnfermedadesList, selectCargando } from '../../ngrx/selectors/enfermedades-list.selectors';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import * as SelectEnfermedadesList from '../../ngrx/selectors/enfermedades-list.selectors'
import * as EnfermedadesListActions from 'src/app/layout/enfermedades/ngrx/actions/enfermedades-list.actions';
import { Table } from 'primeng/table';
import { Enfermedad } from 'src/app/shared/models/entidades/enfermedad.model';
import { FamiliaEnfermedadService } from 'src/app/layout/visitas/services/familiaEnfermedad.service';
import { FamiliaEnfermedad } from 'src/app/shared/models/entidades/familiaEnfermedad.model';

@Component({
  selector: 'app-enfermedades-list',
  templateUrl: './enfermedades-list.component.html',
  styleUrls: ['./enfermedades-list.component.css']
})
export class EnfermedadesListComponent implements OnInit, OnDestroy {

  cargando$: Observable<boolean> = new Observable();
  enfermedades$: Observable<any | null> = new Observable();
  error$: Observable<boolean> = new Observable();
  showConfirmationDialog: boolean = false;
  searchValue: string = '';
  enfermedadToDeleteId: number | null = null;
  @ViewChild('dt') dt: Table | undefined;
  destroy$: Subject<boolean> = new Subject<boolean>();
  showErrorModal!: boolean;
  showSuccessModal!: boolean;
  errorMessage!: string;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private location: Location,
    private familiaEnfermedadService: FamiliaEnfermedadService
  ) { }

  ngOnInit(): void {
    // Iniciar la carga de enfermedades
    this.store.dispatch(EnfermedadesListActions.LoadingEnfermedades());
    this.cargando$ = this.store.select(selectCargando);

    this.error$ = this.store.select(SelectEnfermedadesList.selectErrorCarga);

    this.store.select(SelectEnfermedadesList.selectShowErrorModal).pipe(takeUntil(this.destroy$)).subscribe(showErrorModal => {
      this.showErrorModal = showErrorModal;
    });

    this.store.select(SelectEnfermedadesList.selectShowSuccessModal).pipe(takeUntil(this.destroy$)).subscribe(showSuccessModal => {
      this.showSuccessModal = showSuccessModal;
    });

    this.store.select(SelectEnfermedadesList.selectErrorMessage).pipe(takeUntil(this.destroy$)).subscribe(errorMessage => {
      this.errorMessage = errorMessage;
    });

    // Obtener las enfermedades y las familias de enfermedades
    const familias$ = this.familiaEnfermedadService.getAll();

    this.enfermedades$ = combineLatest([
      this.store.select(selectEnfermedadesList),
      familias$,
    ]).pipe(
      map(([enfermedades, familias]) => this.transformarEnfermedades(enfermedades, familias))
    );

    this.error$ = this.store.select(selectErrorCarga);
  }

  transformarEnfermedades(enfermedades: Enfermedad[], familias: FamiliaEnfermedad[]): any[] {
    const enfermedadesTransformadas: any[] = [];
    const familiasMap = new Map(familias.map(familia => [familia.Id, familia])); // Crear un mapa de las familias por su Id

    enfermedades.forEach((enfermedad: Enfermedad) => {
      const familia = familiasMap.get(enfermedad.IdFamiliaEnfermedad);
      if (familia) {
        enfermedadesTransformadas.push({
          Id: enfermedad.Id,
          Nombre: enfermedad.Nombre,
          Tipo: familia.Tipo,
          FamiliaEnfermedad: familia.Nombre, // Agregar el nombre de la familia al objeto transformado
        });
      }
    });
    console.log(enfermedadesTransformadas);
    return enfermedadesTransformadas;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  goBack(): void {
    this.location.back();
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = '';
  }

  onDeleteVisita() {
    this.showConfirmationDialog = false;
    this.store.dispatch(EnfermedadesListActions.DeleteEnfermedad({ id: this.enfermedadToDeleteId! }));
  }

  applyFilterGlobal($event: Event, matchMode: string) {
    const input = $event.target as HTMLInputElement;
    this.dt!.filterGlobal(input.value, matchMode);
  }

  showDeleteConfirmationDialog(id: number) {
    this.showConfirmationDialog = true;
    this.enfermedadToDeleteId = id;
  }

  closeModal(): void {
    this.store.dispatch(EnfermedadesListActions.CloseModal());
    this.store.dispatch(EnfermedadesListActions.LoadingEnfermedades());
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
}
