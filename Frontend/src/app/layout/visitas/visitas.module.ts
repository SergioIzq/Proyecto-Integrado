import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { EffectsModule } from '@ngrx/effects';
import { VisitasListComponent } from './pages/visitas-list/visitas-list.component';
import { VisitaDetailComponent } from './pages/visita-detail/visita-detail.component';
import { VisitasListEffects } from './ngrx/effects/visitas-list.effects';
import { VisitaDetailEffects } from './ngrx/effects/visita-detail.effects';
import { VisitaService } from './services/visitas.service';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { VisitasRoutingModule } from './visitas.routing';
import { CheckboxModule } from 'primeng/checkbox';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

const VISITAS_COMPONENTS = [
    VisitasListComponent,
    VisitaDetailComponent
];

const VISITAS_EFFECTS = [
    VisitasListEffects,
    VisitaDetailEffects
];

const VISITAS_PROVIDERS = [
    VisitaService,
];

@NgModule({
    declarations: [
        ...VISITAS_COMPONENTS,
    ],
    imports: [  
        ProgressSpinnerModule,        
        RippleModule,          
        ScrollPanelModule,          
        CheckboxModule,  
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        ButtonModule,
        DialogModule,
        TableModule,
        ToastModule,                
        InputTextModule,    
        VisitasRoutingModule,
        EffectsModule.forFeature(VISITAS_EFFECTS),
    ],
    providers: [
        ...VISITAS_PROVIDERS,
        MessageService
    ],
    exports: [
        CommonModule,
        ...VISITAS_COMPONENTS,
    ]
})
export class VisitasModule { }
