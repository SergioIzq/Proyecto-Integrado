import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { EffectsModule } from '@ngrx/effects';
import { MedicosListComponent } from './pages/medicos-list/medicos-list.component';
import { MedicoListEffects } from './ngrx/effects/medicos-list.effects';
import { MedicoDetailComponent } from './pages/medico-detail/medico-detail.component';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { MedicoService } from './services/medico.service';
import { InputTextModule } from 'primeng/inputtext';
import { MedicoDetailEffects } from './ngrx/effects/medico-detail.effects';
import { MedicosRoutingModule } from './medicos.routing';
import { InputMaskModule } from 'primeng/inputmask';


const MEDICOS_COMPONENTS = [
    MedicosListComponent,
    MedicoDetailComponent
];

const MEDICOS_EFFECTS = [
    MedicoListEffects,
    MedicoDetailEffects
];

const MEDICOS_PROVIDERS = [
    MedicoService,
];

@NgModule({
    declarations: [
        ...MEDICOS_COMPONENTS,
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
        MedicosRoutingModule,
        InputMaskModule,
        EffectsModule.forFeature(MEDICOS_EFFECTS),
    ],
    providers: [
        ...MEDICOS_PROVIDERS
    ],
    exports: [
        CommonModule,
        ...MEDICOS_COMPONENTS,
    ]
})
export class MedicosModule { }
