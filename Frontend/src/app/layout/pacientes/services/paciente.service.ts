import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paciente } from 'src/app/shared/models/entidades/paciente.model';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  apiUrl = 'https://localhost:7115/api/';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Paciente[]> {
    const url = `${this.apiUrl}Paciente`;
    return this.http.get<Paciente[]>(url);
  }

  getCantidad(page: number, size: number, sortField: string, sortOrder: number, filters: any): Observable<any[]> {
    const url = `${this.apiUrl}Paciente/getCantidad`;

    // Serializar los filtros a JSON
    const filtersJson = JSON.stringify(filters);

    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortField', sortField)
      .set('filters', filtersJson) // Añadir los filtros serializados
      .set('sortOrder', sortOrder.toString());

    return this.http.get<any[]>(url, { params });
  }

  getById(id: number): Observable<Paciente> {
    const url = `${this.apiUrl}Paciente/${id}`;
    return this.http.get<Paciente>(url);
  }

  update(visita: Partial<Paciente>): Observable<Paciente> {
    const url = `${this.apiUrl}Paciente/${visita.Id}`;
    return this.http.put<Paciente>(url, visita);
  }

  delete(id: number): Observable<Paciente> {
    const url = `${this.apiUrl}Paciente/${id}`;
    return this.http.delete<Paciente>(url);
  }

  create(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(`${this.apiUrl}Paciente`, paciente);
  }

  getIdByCorreo(correo: string): Observable<any> {
    const url = `${this.apiUrl}Paciente/getIdByCorreo/${correo}`;
    return this.http.get<any>(url);
  }

}
