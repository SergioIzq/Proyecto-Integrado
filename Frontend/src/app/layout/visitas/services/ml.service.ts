import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { MlData } from 'src/app/shared/models/entidades/ml.model';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MLService {

  apiUrl = 'https://localhost:7115/api/';

  constructor(private http: HttpClient) { }

  // Se descartan estos dos algoritmos por mal rendimiento con los datos dados por la BBDD
  clusterPrediction(data: MlData): Observable<any> {
    const url = `${this.apiUrl}MLCluster/predict`;
    return this.http.post<any>(url, data);
  }

  recommendationPrediction(data: MlData): Observable<any> {
    const url = `${this.apiUrl}MLRecommendation/predict`;
    return this.http.post<any>(url, data);
  }

  regressionPredictionAll(data: any): Observable<any> {
    const url = `${this.apiUrl}MLRegression/predictForMedicamentos`;
    return this.http.post<any>(url, data).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Error desconocido';
        if (error.error instanceof ErrorEvent) {
          // Error del lado del cliente
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Error del lado del servidor
          errorMessage = `Error en el servidor: ${error.status}, ${error.error.message}`;
        }
        // Lanza el error para que el componente pueda manejarlo
        return throwError(errorMessage);
      })
    );
  }

}
