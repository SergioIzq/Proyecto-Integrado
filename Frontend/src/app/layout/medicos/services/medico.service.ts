import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medico } from 'src/app/shared/models/entidades/medico.model';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  apiUrl = 'https://localhost:7115/api/';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Medico[]> {
    const url = `${this.apiUrl}Medico`;
    return this.http.get<Medico[]>(url);
  }

  getCantidad(page: number, size: number, sortField: string, sortOrder: number, filters: any): Observable<any[]> {
    const url = `${this.apiUrl}Medico/getCantidad`;

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

  getById(id: number): Observable<Medico> {
    const url = `${this.apiUrl}Medico/${id}`;
    return this.http.get<Medico>(url);
  }

  update(medico: Partial<Medico>): Observable<Medico> {
    const url = `${this.apiUrl}Medico/${medico.Id}`;
    return this.http.put<Medico>(url, medico);
  }

  delete(id: number): Observable<Medico> {
    const url = `${this.apiUrl}Medico/${id}`;
    return this.http.delete<Medico>(url);
  }

  create(medico: Medico): Observable<Medico> {
    return this.http.post<Medico>(`${this.apiUrl}Medico`, medico);
  }

  getIdByCorreo(correo: string): Observable<any> {
    const url = `${this.apiUrl}Medico/getIdByCorreo/${correo}`;
    return this.http.get<any>(url);
  }

}
