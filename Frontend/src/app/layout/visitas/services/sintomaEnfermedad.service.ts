import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, forkJoin, switchMap } from 'rxjs';
import { SintomaEnfermedad } from 'src/app/shared/models/entidades/sintomaEnfermedad.model';
import { Enfermedad } from 'src/app/shared/models/entidades/enfermedad.model';
import { Sintoma } from 'src/app/shared/models/entidades/sintoma.model';

@Injectable({
  providedIn: 'root'
})
export class SintomaEnfermedadService {

  apiUrl = 'https://localhost:7115/api/';

  constructor(private http: HttpClient) { }

  getAll(): Observable<SintomaEnfermedad[]> {
    const url = `${this.apiUrl}SintomaEnfermedad`;
    return this.http.get<SintomaEnfermedad[]>(url);
  }
  
  getById(id: number): Observable<SintomaEnfermedad> {
    const url = `${this.apiUrl}SintomaEnfermedad/${id}`;
    return this.http.get<SintomaEnfermedad>(url);
  }

  update(enfermedad: Partial<SintomaEnfermedad>): Observable<SintomaEnfermedad> {
    const url = `${this.apiUrl}SintomaEnfermedad/${enfermedad.Id}`;
    return this.http.put<SintomaEnfermedad>(url, enfermedad);
  }

  delete(id: number): Observable<SintomaEnfermedad> {
    const url = `${this.apiUrl}SintomaEnfermedad/${id}`;
    return this.http.delete<SintomaEnfermedad>(url);
  }

  getEnfermedadById(id: number): Observable<Enfermedad> {
    const url = `${this.apiUrl}Enfermedad/${id}`;
    return this.http.get<Enfermedad>(url);
  }

  getSintomaById(id: number): Observable<Sintoma> {
    const url = `${this.apiUrl}Sintoma/${id}`;
    return this.http.get<Sintoma>(url);
  }

  getEnfermedadesPorSintomas(sintomaIds: number[]): Observable<Enfermedad[]> {
    const url = `${this.apiUrl}SintomaEnfermedad/enfermedades-por-sintomas`;
    return this.http.post<Enfermedad[]>(url, sintomaIds);
  }


  obtenerDetallesEnfermedades(enfermedadesIds: number[]): Observable<Enfermedad[]> {
    const requests = enfermedadesIds.map(id => this.getEnfermedadById(id));
    return forkJoin(requests);
  }

  obtenerDetallesSintomas(sintomasIds: number[]): Observable<Sintoma[]> {
    const url = `${this.apiUrl}Sintoma`; // URL para obtener todos los síntomas
    return this.http.get<Sintoma[]>(url).pipe(
      map(sintomas => sintomas.filter(sintoma => sintomasIds.includes(sintoma.Id)))
    );
  }

  obtenerIdsSintomaEnfermedadPorSintomas(sintomaIds: any[]): Observable<number[]> {
    const url = `${this.apiUrl}SintomaEnfermedad/ids-por-sintomas`;
    return this.http.post<number[]>(url, sintomaIds);
  }


}
