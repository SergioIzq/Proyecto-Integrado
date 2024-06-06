import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, takeUntil, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAuthStatus, selectIsSidebarOpen, selectRol, selectUserId } from './ngrx/selectors/menu.selectors';
import * as MenuActions from '../menu/ngrx/actions/menu.actions'
import { AppState } from 'src/app/app.state';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {

  isSidebarOpen$!: Observable<boolean>;
  isLoggedIn$!: Observable<boolean>;
  jwtToken!: string | null;
  currentUser$!: string | null;
  items!: MenuItem[];
  userId!: string | null;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.store.dispatch(MenuActions.GetJWTtoken());
    this.store.dispatch(MenuActions.GetUserDetails());

    this.store.select(selectUserId).pipe(takeUntil(this.destroy$)).subscribe(userId => {
      this.userId = userId;
    });

    this.store.select(selectRol).pipe(takeUntil(this.destroy$)).subscribe(currentUser => {
      if (currentUser === 'M') {        
        this.items = [
          { label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink: '/home' },
          { label: 'Modificar Perfil', icon: 'pi pi-fw pi-user-edit', routerLink: `/medicos/medico-detail/${this.userId}` },
          { label: 'Visitas', icon: 'pi pi-fw pi-calendar', routerLink: '/visitas/lista-visitas' },
          { label: 'Medicos', icon: 'pi pi-fw pi-id-card', routerLink: '/medicos/lista-medicos' },
          { label: 'Pacientes', icon: 'pi pi-fw pi-users', routerLink: '/pacientes/lista-pacientes' },
          { label: 'Enfermedades', icon: 'fas fa-solid fa-square-virus', routerLink: '/enfermedades/lista-enfermedades' },
          { label: 'Medicamentos', icon: 'fas fa-solid fa-prescription-bottle-medical', routerLink: '/medicamentos/lista-medicamentos' },
          { label: 'Cerrar Sesión', icon: 'pi pi-fw pi-sign-out', command: () => this.logout() }
        ];
      } else if (currentUser === 'P') {
        this.items = [
          { label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink: '/home' },
          { label: 'Modificar Perfil', icon: 'pi pi-fw pi-user-edit', routerLink: `/pacientes/paciente-detail/${this.userId}` },
          { label: 'Historial Visitas', icon: 'pi pi-fw pi-book', routerLink: `/pacientes/paciente-historial` },
          { label: 'Enfermedades', icon: 'fas fa-solid fa-square-virus', routerLink: '/enfermedades/lista-enfermedades' },
          { label: 'Medicamentos', icon: 'fas fa-solid fa-square-virus', routerLink: '/medicamentos/lista-medicamentos' },
          { label: 'Cerrar Sesión', icon: 'pi pi-fw pi-sign-out', command: () => this.logout() }
        ];
      } else {
        this.items = [
          { label: 'Iniciar Sesión', icon: 'pi pi-fw pi-sign-in', routerLink: '/auth/login' },
          { label: 'Registrarse', icon: 'pi pi-fw pi-user-plus', routerLink: '/auth/registro' }
        ];
      }
    });

    this.store.dispatch(MenuActions.CheckAuthStatus());

    this.isSidebarOpen$ = this.store.select(selectIsSidebarOpen);

    // Suscribirse al estado de autenticación para actualizar isLoggedIn$
    this.store.select(selectAuthStatus).pipe(takeUntil(this.destroy$)).subscribe(isLoggedIn => {
      this.isLoggedIn$ = of(isLoggedIn);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  CambiarSidebar(): void {
    this.store.dispatch(MenuActions.CambiarSidebar());
  }

  logout(): void {
    this.authService.logout();
    const isLoggedIn = false;
    // Despachar la acción ActualizarAuthStatus con el nuevo estado de autenticación
    this.store.dispatch(MenuActions.ActualizarAuthStatus({ isLoggedIn }));
    this.store.dispatch(MenuActions.SetUserDetails({ rol: '', id: '' }))
    this.router.navigate(['auth/login']);
  }

}
