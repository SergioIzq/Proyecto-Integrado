import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    // Verificar si el usuario está logueado
    if(!this.authService.isLoggedIn){
      this.router.navigate(['/acceso-no-autorizado']);
    }
    return this.authService.isLoggedIn()
  }
}
