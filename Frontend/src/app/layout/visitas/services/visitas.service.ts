import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Visita } from 'src/app/shared/models/entidades/visita.model';
import { Paciente } from 'src/app/shared/models/entidades/paciente.model';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VisitaService {

  apiUrl = 'https://localhost:7115/api/';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Paciente[]> {
    const url = `${this.apiUrl}Paciente`;
    return this.http.get<Paciente[]>(url);
  }

  getCantidad(page: number, size: number, sortField: string, sortOrder: number, filters: any): Observable<any[]> {
    const url = `${this.apiUrl}Visita/getCantidad`;
  
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

  getById(id: number): Observable<Visita> {
    const url = `${this.apiUrl}Visita/${id}`;
    return this.http.get<Visita>(url);
  }

  create(visita: Partial<Visita>): Observable<Visita> {
    return this.http.post<Visita>(`${this.apiUrl}Visita`, visita);
  }

  update(visita: Partial<Visita>): Observable<Visita> {
    const url = `${this.apiUrl}Visita/updateVisita/${visita.Id}`;
    return this.http.put<Visita>(url, visita);
  }

  delete(id: number): Observable<Visita> {
    const url = `${this.apiUrl}Visita/${id}`;
    return this.http.delete<Visita>(url);
  }

  seedVisitas(cantidad: number): Observable<any> {
    const url = `${this.apiUrl}Visita/seed/${cantidad}`;
    return this.http.post<any>(url, null);
  }

}
