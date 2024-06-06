import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enfermedad } from 'src/app/shared/models/entidades/enfermedad.model';
import { FamiliaEnfermedad } from '../../../shared/models/entidades/familiaEnfermedad.model';


@Injectable({
  providedIn: 'root'
})
export class EnfermedadService {

  apiUrl = 'https://localhost:7115/api/';

  constructor(private http: HttpClient) { }


  create(enfermedad: Enfermedad): Observable<Enfermedad> {
    return this.http.post<Enfermedad>(`${this.apiUrl}Enfermedad`, enfermedad);
  }
  getAll(): Observable<Enfermedad[]> {
    const url = `${this.apiUrl}Enfermedad`;
    return this.http.get<Enfermedad[]>(url);
  }

  getById(id: number): Observable<Enfermedad> {
    const url = `${this.apiUrl}Enfermedad/${id}`;
    return this.http.get<Enfermedad>(url);
  }

  update(enfermedad: Partial<Enfermedad>): Observable<Enfermedad> {
    const url = `${this.apiUrl}Enfermedad/${enfermedad.Id}`;
    return this.http.put<Enfermedad>(url, enfermedad);
  }

  delete(id: number): Observable<Enfermedad> {
    const url = `${this.apiUrl}Enfermedad/${id}`;
    return this.http.delete<Enfermedad>(url);
  }

  getFamiliaEnfermedad(id: number): Observable<FamiliaEnfermedad> {
    const url = `${this.apiUrl}Enfermedad/Familia${id}`;
    return this.http.get<FamiliaEnfermedad>(url)
  }

  getIdByNombre(nombre: string): Observable<any> {
    const url = `${this.apiUrl}Enfermedad/getIdByNombre/${nombre}`;
    return this.http.get<any>(url);
  }

}
