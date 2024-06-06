import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FamiliaEnfermedad } from '../../../shared/models/entidades/familiaEnfermedad.model';


@Injectable({
  providedIn: 'root'
})
export class FamiliaEnfermedadService {

  apiUrl = 'https://localhost:7115/api/';

  constructor(private http: HttpClient) { }

  getAll(): Observable<FamiliaEnfermedad[]> {
    const url = `${this.apiUrl}FamiliaEnfermedad`;
    return this.http.get<FamiliaEnfermedad[]>(url);
  }

  getById(id: number): Observable<FamiliaEnfermedad> {
    const url = `${this.apiUrl}FamiliaEnfermedad/${id}`;
    return this.http.get<FamiliaEnfermedad>(url);
  }

  update(enfermedad: Partial<FamiliaEnfermedad>): Observable<FamiliaEnfermedad> {
    const url = `${this.apiUrl}FamiliaEnfermedad/${enfermedad.Id}`;
    return this.http.put<FamiliaEnfermedad>(url, enfermedad);
  }

  delete(id: number): Observable<FamiliaEnfermedad> {
    const url = `${this.apiUrl}FamiliaEnfermedad/${id}`;
    return this.http.delete<FamiliaEnfermedad>(url);
  }

}
