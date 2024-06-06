import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sintoma } from 'src/app/shared/models/entidades/sintoma.model';

@Injectable({
  providedIn: 'root'
})
export class SintomaService {

  apiUrl = 'https://localhost:7115/api/';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Sintoma[]> {
    const url = `${this.apiUrl}Sintoma`;
    return this.http.get<Sintoma[]>(url);
  }

  getById(id: number): Observable<Sintoma> {
    const url = `${this.apiUrl}Sintoma/${id}`;
    return this.http.get<Sintoma>(url);
  }

  update(enfermedad: Partial<Sintoma>): Observable<Sintoma> {
    const url = `${this.apiUrl}Sintoma/${enfermedad.Id}`;
    return this.http.put<Sintoma>(url, enfermedad);
  }

  delete(id: number): Observable<Sintoma> {
    const url = `${this.apiUrl}Sintoma/${id}`;
    return this.http.delete<Sintoma>(url);
  }

}
