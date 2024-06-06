import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button'; 
import { DialogModule } from 'primeng/dialog';
import { EffectsModule } from '@ngrx/effects';
import { MedicamentosListComponent } from './pages/medicamentos-list/medicamentos-list.component';
import { MedicamentosListEffects } from './ngrx/effects/medicamentos-list.effects';
import { MedicamentoService } from './services/medicamento.service';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { MedicamentosRoutingModule } from './medicamentos.routing';


const MEDICAMENTOS_COMPONENTS = [
  MedicamentosListComponent,
];

const MEDICAMENTOS_EFFECTS = [
  MedicamentosListEffects,
];

const MEDICAMENTOS_PROVIDERS = [
  MedicamentoService,
];

@NgModule({
  declarations: [
    ...MEDICAMENTOS_COMPONENTS,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,     
    ButtonModule,
    DialogModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    InputTextModule,
    MedicamentosRoutingModule,
    EffectsModule.forFeature(MEDICAMENTOS_EFFECTS),
  ],
  providers: [
    ...MEDICAMENTOS_PROVIDERS
  ],
  exports: [
    CommonModule,
    ...MEDICAMENTOS_COMPONENTS,
  ]
})
export class MedicamentosModule { }
