import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FamiliaMedicamento } from 'src/app/shared/models/entidades/familiaMedicamento.model';

@Injectable({
  providedIn: 'root'
})
export class FamiliaMedicamentoService {

  apiUrl = 'https://localhost:7115/api/';

  constructor(private http: HttpClient) { }

  getAll(): Observable<FamiliaMedicamento[]> {
    const url = `${this.apiUrl}FamiliaMedicamento`;
    return this.http.get<FamiliaMedicamento[]>(url);
  }

  getById(id: number): Observable<FamiliaMedicamento> {
    const url = `${this.apiUrl}FamiliaMedicamento/${id}`;
    return this.http.get<FamiliaMedicamento>(url);
  }

  update(enfermedad: Partial<FamiliaMedicamento>): Observable<FamiliaMedicamento> {
    const url = `${this.apiUrl}FamiliaMedicamento/${enfermedad.Id}`;
    return this.http.put<FamiliaMedicamento>(url, enfermedad);
  }

  delete(id: number): Observable<FamiliaMedicamento> {
    const url = `${this.apiUrl}FamiliaMedicamento/${id}`;
    return this.http.delete<FamiliaMedicamento>(url);
  }

}
