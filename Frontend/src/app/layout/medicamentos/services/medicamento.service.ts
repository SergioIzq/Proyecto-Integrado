import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medicamento } from 'src/app/shared/models/entidades/medicamento.model';


@Injectable({
  providedIn: 'root'
})
export class MedicamentoService {

  apiUrl = 'https://localhost:7115/api/';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Medicamento[]> {
    const url = `${this.apiUrl}Medicamento`;
    return this.http.get<Medicamento[]>(url);
  }

  getById(id: number): Observable<Medicamento> {
    const url = `${this.apiUrl}Medicamento/${id}`;
    return this.http.get<Medicamento>(url);
  }

  update(medicamento: Partial<Medicamento>): Observable<Medicamento> {
    const url = `${this.apiUrl}Medicamento/${medicamento.Id}`;
    return this.http.put<Medicamento>(url, medicamento);
  }

  delete(id: number): Observable<Medicamento> {
    const url = `${this.apiUrl}Medicamento/${id}`;
    return this.http.delete<Medicamento>(url);
  }

  getIdByNombre(nombre: string): Observable<any> {
    const url = `${this.apiUrl}Medicamento/getIdByNombre/${nombre}`;
    return this.http.get<any>(url);
  }

}
