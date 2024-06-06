import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, of } from 'rxjs';
import { Medico } from '../models/entidades/medico.model';
import { Paciente } from '../models/entidades/paciente.model';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://localhost:7115/api/Authentication';
  private jwtTokenKey = 'jwtTokenKey';
  private userRol!: string;
  private userId!: string;

  constructor(private http: HttpClient) { }

  loginPaciente(correoElectronico: string, contrasena: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login/paciente`, { correoElectronico, contrasena }).pipe(
      tap(response => {
        this.handleAuthentication(response);
      })
    );
  }

  loginMedico(correoElectronico: string, contrasena: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login/medico`, { correoElectronico, contrasena }).pipe(
      tap(response => {
        this.handleAuthentication(response);
      })
    );
  }

  registerMedico(medico: Medico): Observable<Medico> {
    return this.http.post<Medico>(`https://localhost:7115/api/Medico`, medico);
  }

  registerPaciente(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(`https://localhost:7115/api/Paciente`, paciente);
  }

  refreshToken(oldToken: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/refrescar-token`, { oldToken });
  }

  isLoggedIn(): boolean {
    return !!this.getJwtToken();
  }

  getJwtToken(): string | null {
    return localStorage.getItem(this.jwtTokenKey);
  }

  setJwtToken(jwtToken: string): void {
    localStorage.setItem(this.jwtTokenKey, jwtToken);
    this.updateUserRoleId()
  }

  logout(): void {
    localStorage.removeItem(this.jwtTokenKey);
    this.setUserRole('');
    this.setUserId('');
  }

  setUserRole(rol: string): void {
    this.userRol = rol;
  }

  setUserId(id: string): void {
    this.userId = id;
  }

  getUserRol(): string {
    return this.userRol;
  }

  getUserId(): Observable<number> {  
    const userIdNumber = parseInt(this.userId, 10);
    return of(userIdNumber);
  }



  decodeJwtToken(): any {
    const token = this.getJwtToken();
    if (token) {
      return jwt_decode(token);
    }
    return null;
  }

  private handleAuthentication(response: any): void {
    const { token } = response;
    this.setJwtToken(token);
  }

  updateUserRoleId(): Observable<{ rol: string | null; id: string | null }> {
    const jwtToken = this.getJwtToken();
    if (jwtToken) {
      const decodedToken: any = jwt_decode(jwtToken);
      const rol = decodedToken['role'];
      const id = decodedToken['nameid'];
      this.setUserRole(rol);
      this.setUserId(id);      
      return of({ rol, id });
    } else {
      this.setUserRole('');
      this.setUserId('');
      return of({ rol: null, id: null });
    }
  }

}
