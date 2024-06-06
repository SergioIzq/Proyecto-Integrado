import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { ROOT_REDUCERS } from './app.state';
import { EffectsModule } from '@ngrx/effects';
import { VisitasListEffects } from './layout/visitas/ngrx/effects/visitas-list.effects';
import { VisitaDetailEffects } from './layout/visitas/ngrx/effects/visita-detail.effects';
import { HomePageComponent } from './shared/home/home-page.component';
import { MenuComponent } from './shared/menu/menu.component';
import { MenuEffects } from '../app/shared/menu/ngrx/effects/menu.effects'
import { RegistroEffects } from './shared/auth/registro/ngrx/effects/registro.effects';
import { AccesoNoAutorizadoComponent } from './shared/acceso-no-autorizado/acceso-no-autorizado.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MultiSelectModule } from 'primeng/multiselect';
import { SliderModule } from 'primeng/slider';
import { ProgressBarModule } from 'primeng/progressbar';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { NotFoundComponent } from './shared/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MenuComponent,
    AccesoNoAutorizadoComponent,
    NotFoundComponent,    
  ],
  imports: [ 
    CardModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    MultiSelectModule,
    DropdownModule,
    SliderModule,
    ProgressBarModule,
    MenubarModule,
    MenuModule,
    SidebarModule,
    BadgeModule,
    StoreModule.forRoot(ROOT_REDUCERS),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    EffectsModule.forRoot([MenuEffects]),
  ],
  providers: [
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
