import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { EffectsModule } from '@ngrx/effects';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { EnfermedadesRoutingModule } from './enfermedades.routing';
import { EnfermedadesListComponent } from './pages/enfermedades-list/enfermedades-list.component';
import { EnfermedadesListEffects } from './ngrx/effects/enfermedades-list.effects';
import { EnfermedadService } from './services/enfermedad.service';
import { EnfermedadDetailComponent } from './pages/enfermedad-detail/enfermedad-detail.component';
import { EnfermedadDetailEffects } from './ngrx/effects/enfermedad-detail.effects';

const ENFERMEDADES_COMPONENTS = [
    EnfermedadesListComponent,
    EnfermedadDetailComponent
];

const ENFERMEDADES_EFFECTS = [
    EnfermedadesListEffects,
    EnfermedadDetailEffects
];

const ENFERMEDADES_PROVIDERS = [
    EnfermedadService,
];

@NgModule({
    declarations: [
        ...ENFERMEDADES_COMPONENTS,
        EnfermedadesListComponent,
        EnfermedadDetailComponent,
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
        EnfermedadesRoutingModule,
        EffectsModule.forFeature(ENFERMEDADES_EFFECTS),
    ],
    providers: [
        ...ENFERMEDADES_PROVIDERS
    ],
    exports: [
        CommonModule,
        ...ENFERMEDADES_COMPONENTS,
    ]
})
export class EnfermedadesModule { }
