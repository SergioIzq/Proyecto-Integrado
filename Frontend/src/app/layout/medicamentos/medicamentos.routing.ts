import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { UserIdGuard } from 'src/app/shared/guards/userId.guard';
import { MedicamentosListComponent } from './pages/medicamentos-list/medicamentos-list.component';


const routes: Routes = [
    { path: 'lista-medicamentos', component: MedicamentosListComponent, canActivate: [AuthGuard] },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MedicamentosRoutingModule { }
