import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from './api-service';

@Injectable({
  providedIn: 'root'
})
export class CupsService extends ApiService {

  private API_CUP_URL = this.API_ROOT + 'cup/';

  constructor(private http: HttpClient) {
    super();
  }

  getCups(): Observable<any> {

    return this.http.get<any>(this.API_CUP_URL, { headers: this.getHeaders() })
    .pipe(
      catchError(this.handleError<any>('getCup', {cup:[]}))
    );
  }

  createCup(cup: object): Observable<any> {
    return this.http.post<any>(this.API_CUP_URL, cup, { headers: this.getHeaders() })
    .pipe(
      catchError(this.handleError<any>('createCup'))
    );

  }

  getCupById(id: string): Observable<any> {
    return this.http.get<any>(this.API_CUP_URL + id, { headers: this.getHeaders() })
    .pipe(
      catchError(this.handleError<any>('getCupById'))
    );
  }

  updateCup(id: string, cup: object): Observable<any> {
    return this.http.put<any>(this.API_CUP_URL + id , cup, { headers: this.getHeaders() })
    .pipe(
      catchError(this.handleError<any>('updateCup'))
    );
  }

  deleteCup(id: string): Observable<any> {
    return this.http.delete<any>(this.API_CUP_URL + id, { headers: this.getHeaders() })
    .pipe(
      catchError(this.handleError<any>('deleteCup'))
    );
  }

}
