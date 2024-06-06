import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectErrorCarga, selectMedicamentosList, selectCargando } from '../../ngrx/selectors/medicamentos-list.selectors';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import * as MedicamentosListActions from 'src/app/layout/medicamentos/ngrx/actions/medicamentos-list.actions';
import { Table } from 'primeng/table';
import { Medicamento } from 'src/app/shared/models/entidades/medicamento.model';
import { FamiliaMedicamentoService } from 'src/app/layout/visitas/services/familiaMedicamento.service';
import { FamiliaMedicamento } from 'src/app/shared/models/entidades/familiaMedicamento.model';

@Component({
  selector: 'app-medicamentos-list',
  templateUrl: './medicamentos-list.component.html',
  styleUrls: ['./medicamentos-list.component.css']
})
export class MedicamentosListComponent implements OnInit {

  cargando$: Observable<boolean> = new Observable();
  medicamentos$: Observable<any | null> = new Observable();
  error$: Observable<boolean> = new Observable();
  showConfirmationDialog: boolean = false;
  searchValue: string = '';
  @ViewChild('dt') dt: Table | undefined;

  constructor(
    private store: Store<AppState>,    
    private location: Location,
    private familiaMedicamentoService: FamiliaMedicamentoService
  ) { }

  ngOnInit(): void {
    // Iniciar la carga de medicamentos
    this.store.dispatch(MedicamentosListActions.LoadingMedicamentos());
    this.cargando$ = this.store.select(selectCargando);

    // Obtener los medicamentos y las familias de medicamentos
    const familias$ = this.familiaMedicamentoService.getAll();

    this.medicamentos$ = combineLatest([
      this.store.select(selectMedicamentosList),
      familias$
    ]).pipe(
      map(([medicamentos, familias]) => this.transformarMedicamentos(medicamentos, familias))
    );

    this.error$ = this.store.select(selectErrorCarga);
  }

  transformarMedicamentos(medicamentos: Medicamento[], familias: FamiliaMedicamento[]): any[] {
    const medicamentosTransformados: any[] = [];
    const familiasMap = new Map(familias.map(familia => [familia.Id, familia]));

    medicamentos.forEach((medicamento: Medicamento) => {
      const familia = familiasMap.get(medicamento.IdFamiliaMedicamento);
      if (familia) {
        medicamentosTransformados.push({
          Id: medicamento.Id,
          Nombre: medicamento.Nombre,
          Precio: medicamento.Precio,
          Descripcion: medicamento.Descripcion,
          Familia: familia.Nombre
        });
      }
    });

    return medicamentosTransformados;
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
