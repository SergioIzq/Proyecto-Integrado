import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { VisitasListComponent } from './pages/visitas-list/visitas-list.component';
import { VisitaDetailComponent } from './pages/visita-detail/visita-detail.component';
import { RolGuard } from 'src/app/shared/guards/rol.guard';

const routes: Routes = [
    {
        path: 'lista-visitas', component: VisitasListComponent, canActivate: [AuthGuard]
    },
    {
        path: 'visita-detail/:id', component: VisitaDetailComponent, canActivate: [AuthGuard, RolGuard], data: { expectedRole: 'M' }
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VisitasRoutingModule { }
