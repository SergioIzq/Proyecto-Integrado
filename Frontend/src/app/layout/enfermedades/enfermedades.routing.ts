import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { EnfermedadesListComponent } from './pages/enfermedades-list/enfermedades-list.component';
import { EnfermedadDetailComponent } from './pages/enfermedad-detail/enfermedad-detail.component';
import { RolGuard } from 'src/app/shared/guards/rol.guard';

const routes: Routes = [
    { path: 'lista-enfermedades', component: EnfermedadesListComponent, canActivate: [AuthGuard] },
    { path: 'enfermedad-detail/:id', component: EnfermedadDetailComponent, canActivate: [AuthGuard, RolGuard], data: { expectedRole: 'M'}}
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EnfermedadesRoutingModule { }
