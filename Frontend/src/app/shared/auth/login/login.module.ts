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
import { LoginRoutingModule } from './login.routing';
import { AuthService } from '../../services/auth.service';


const MEDICOS_COMPONENTS = [
    MedicosListComponent,
    MedicoDetailComponent
];

const MEDICOS_EFFECTS = [
    MedicoListEffects,
    MedicoDetailEffects
];

const LOGIN_PROVIDERS = [
    AuthService,
];

@NgModule({
    declarations: [
        ...MEDICOS_COMPONENTS,
    ],
    imports: [
        LoginRoutingModule,
        EffectsModule.forFeature(),
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
