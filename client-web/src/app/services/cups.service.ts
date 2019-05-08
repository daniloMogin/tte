import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { handleError, getHeaders, this.shared.API_ROOT } from './shared';

@Injectable({
  providedIn: 'root'
})
export class CupsService {

  private API_CUP_URL = this.shared.API_ROOT + 'cup/';

  constructor(private http: HttpClient) {
    ;
  }

  getCups(): Observable<any> {

    return this.http.get<any>(this.API_CUP_URL, { headers: this.shared.getHeaders() })
    .pipe(
      catchError(this.shared.handleError<any>('getCup'))
    );
  }

  createCup(cup: object): Observable<any> {
    return this.http.post<any>(this.API_CUP_URL, cup, { headers: this.shared.getHeaders() })
    .pipe(
      catchError(this.shared.handleError<any>('createCup'))
    );

  }

  getCupById(id: string): Observable<any> {
    return this.http.get<any>(this.API_CUP_URL + id, { headers: this.shared.getHeaders() })
    .pipe(
      catchError(this.shared.handleError<any>('getCupById'))
    );
  }

  updateCup(id: string, cup: object): Observable<any> {
    return this.http.put<any>(this.API_CUP_URL + id , cup, { headers: this.shared.getHeaders() })
    .pipe(
      catchError(this.shared.handleError<any>('updateCup'))
    );
  }

  deleteCup(id: string): Observable<any> {
    return this.http.delete<any>(this.API_CUP_URL + id, { headers: this.shared.getHeaders() })
    .pipe(
      catchError(this.shared.handleError<any>('deleteCup'))
    );
  }

}
