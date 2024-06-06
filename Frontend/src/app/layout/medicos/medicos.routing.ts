import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicoDetailComponent } from './pages/medico-detail/medico-detail.component';
import { MedicosListComponent } from './pages/medicos-list/medicos-list.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { RolGuard } from 'src/app/shared/guards/rol.guard';

const routes: Routes = [
  { path: 'lista-medicos', component: MedicosListComponent, canActivate: [RolGuard, AuthGuard], data: { expectedRole: 'M' } },
  { path: 'medico-detail/:id', component: MedicoDetailComponent, canActivate: [RolGuard, AuthGuard], data: { expectedRole: 'M' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicosRoutingModule { }
