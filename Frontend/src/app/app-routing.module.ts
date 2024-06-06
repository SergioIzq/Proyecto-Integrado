import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './shared/home/home-page.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { AccesoNoAutorizadoComponent } from './shared/acceso-no-autorizado/acceso-no-autorizado.component';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { selectUserId } from './shared/menu/ngrx/selectors/menu.selectors';
import { Observable } from 'rxjs';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuard] },
  {
    path: 'pacientes',
    loadChildren: () => import('./layout/pacientes/pacientes.module').then(m => m.PacientesModule),
  },
  {
    path: 'medicos',
    loadChildren: () => import('./layout/medicos/medicos.module').then(m => m.MedicosModule)
  },
  {
    path: 'visitas',
    loadChildren: () => import('./layout/visitas/visitas.module').then(m => m.VisitasModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./shared/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'medicamentos',
    loadChildren: () => import('./layout/medicamentos/medicamentos.module').then(m => m.MedicamentosModule),
  },
  {
    path: 'enfermedades',
    loadChildren: () => import('./layout/enfermedades/enfermedades.module').then(m => m.EnfermedadesModule),
  },
  { path: 'acceso-no-autorizado', component: AccesoNoAutorizadoComponent },  
  { path: '**', component: NotFoundComponent },  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  userId!: Observable<string | null>;
  constructor(private store: Store<AppState>) {
    this.userId = this.store.select(selectUserId);
  }
}
