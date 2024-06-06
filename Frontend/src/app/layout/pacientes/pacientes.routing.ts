import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { UserIdGuard } from 'src/app/shared/guards/userId.guard';
import { PacienteDetailComponent } from './pages/paciente-detail/paciente-detail.component';
import { PacientesListComponent } from './pages/pacientes-list/pacientes-list.component';
import { PacienteHistorialComponent } from './pages/paciente-historial/paciente-historial.component';

const routes: Routes = [
    { path: 'lista-pacientes', component: PacientesListComponent, canActivate: [AuthGuard] },
    { path: 'paciente-detail/:id', component: PacienteDetailComponent, canActivate: [AuthGuard, UserIdGuard] },
    { path: 'paciente-historial', component: PacienteHistorialComponent, canActivate: [AuthGuard] },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PacientesRoutingModule { }
