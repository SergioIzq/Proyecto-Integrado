import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button'; 
import { DialogModule } from 'primeng/dialog';
import { EffectsModule } from '@ngrx/effects';
import { PacientesListComponent } from './pages/pacientes-list/pacientes-list.component';
import { PacienteDetailComponent } from './pages/paciente-detail/paciente-detail.component';
import { PacientesListEffects } from './ngrx/effects/pacientes-list.effects';
import { PacienteDetailEffects } from './ngrx/effects/paciente-detail.effects';
import { PacienteService } from './services/paciente.service';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { PacientesRoutingModule } from './pacientes.routing';
import { PacienteHistorialComponent } from './pages/paciente-historial/paciente-historial.component';
import { PacienteHistorialEffects } from './ngrx/effects/paciente-historial.effects';


const PACIENTES_COMPONENTS = [
  PacientesListComponent,
  PacienteDetailComponent,
  PacienteHistorialComponent
];

const PACIENTES_EFFECTS = [
  PacientesListEffects,
  PacienteDetailEffects,
  PacienteHistorialEffects
];

const PACIENTES_PROVIDERS = [
  PacienteService,
];

@NgModule({
  declarations: [
    ...PACIENTES_COMPONENTS,
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
    PacientesRoutingModule,
    EffectsModule.forFeature(PACIENTES_EFFECTS),
  ],
  providers: [
    ...PACIENTES_PROVIDERS
  ],
  exports: [
    CommonModule,
    ...PACIENTES_COMPONENTS,
  ]
})
export class PacientesModule { }
