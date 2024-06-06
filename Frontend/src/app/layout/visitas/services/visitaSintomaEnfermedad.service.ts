import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, forkJoin, switchMap } from 'rxjs';
import { VisitaSintomaEnfermedad } from 'src/app/shared/models/entidades/visitaSintomaEnfermedad.model';

@Injectable({
    providedIn: 'root'
})
export class VisitaSintomaEnfermedadService {

    apiUrl = 'https://localhost:7115/api/';

    constructor(private http: HttpClient) { }

    create(visitaSintomaEnfermedad: VisitaSintomaEnfermedad[]): Observable<VisitaSintomaEnfermedad[]> {
        const url = `${this.apiUrl}VisitaSintomaEnfermedad/create-list`;
        return this.http.post<VisitaSintomaEnfermedad[]>(url, visitaSintomaEnfermedad);
    }

    getAll(): Observable<VisitaSintomaEnfermedad[]> {
        const url = `${this.apiUrl}VisitaSintomaEnfermedad`;
        return this.http.get<VisitaSintomaEnfermedad[]>(url);
    }

    getById(id: number): Observable<VisitaSintomaEnfermedad> {
        const url = `${this.apiUrl}VisitaSintomaEnfermedad/${id}`;
        return this.http.get<VisitaSintomaEnfermedad>(url);
    }

    update(visitaSintomaEnfermedad: any[]): Observable<VisitaSintomaEnfermedad[]> {
        const url = `${this.apiUrl}VisitaSintomaEnfermedad/update-list/${visitaSintomaEnfermedad[0].Id}`;
        return this.http.put<VisitaSintomaEnfermedad[]>(url, visitaSintomaEnfermedad);
    }

    delete(id: number): Observable<VisitaSintomaEnfermedad> {
        const url = `${this.apiUrl}VisitaSintomaEnfermedad/${id}`;
        return this.http.delete<VisitaSintomaEnfermedad>(url);
    }

}
