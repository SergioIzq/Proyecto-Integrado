import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { selectUserId, selectRol } from '../menu/ngrx/selectors/menu.selectors';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserIdGuard implements CanActivate {

  constructor(private router: Router, private store: Store<AppState>) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    const expectedId = next.params['id']; // Obtener el ID esperado de los parámetros de la ruta

    return this.store.select(selectRol).pipe(
      switchMap(rol => {
        // Si el rol no es "M" ni "P", permitir el acceso sin aplicar el guard
        if (rol == 'M') {
          return of(true);
        }

        // Si el rol es "M" o "P", comprobar el ID del usuario
        return this.store.select(selectUserId).pipe(
          map(userId => {
            // Si el ID esperado coincide con el ID del usuario, permitir el acceso
            if (expectedId === userId) {
              return true;
            } else {
              // Si el ID esperado no coincide, redirigir a la página de acceso no autorizado
              this.router.navigate(['/acceso-no-autorizado']);
              return false;
            }
          })
        );
      })
    );
  }
}
