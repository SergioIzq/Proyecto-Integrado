import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RolGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {
        const expectedRole = next.data['expectedRole']; 
        // Obtener el tipo de usuario actual desde el localStorage
        const currentUser = this.authService.getUserRol();
        
        // Verificar si el tipo de usuario actual coincide con el esperado
        if (currentUser === expectedRole) {
            return of(true); // Devolver un observable con valor true
        } else {
            // Si el usuario no tiene permiso para acceder a la ruta, redirigirlo a una página de acceso no autorizado
            this.router.navigate(['/acceso-no-autorizado']);
            return of(false); // Devolver un observable con valor false
        }
    }
}
