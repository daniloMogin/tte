import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { handleError, getHeaders, API_ROOT } from './shared';

@Injectable({
  providedIn: 'root'
})
export class CupsService {

  private API_CUP_URL = API_ROOT + 'cup/';

  constructor(private http: HttpClient) {
  }

  getCups(): Observable<any> {

    return this.http.get<any>(this.API_CUP_URL, { headers: getHeaders() })
    .pipe(
      catchError(handleError<any>('getCup'/*, {cup:[]}*/))
    );
  }

  createCup(cup: object): Observable<any> {
    return this.http.post<any>(this.API_CUP_URL, cup, { headers: getHeaders() })
    .pipe(
      catchError(handleError<any>('createCup'))
    );

  }

  getCupById(id: string): Observable<any> {
    return this.http.get<any>(this.API_CUP_URL + id, { headers: getHeaders() })
    .pipe(
      catchError(handleError<any>('getCupById'))
    );
  }

  updateCup(id: string, cup: object): Observable<any> {
    return this.http.put<any>(this.API_CUP_URL + id , cup, { headers: getHeaders() })
    .pipe(
      catchError(handleError<any>('updateCup'))
    );
  }

  deleteCup(id: string): Observable<any> {
    return this.http.delete<any>(this.API_CUP_URL + id, { headers: getHeaders() })
    .pipe(
      catchError(handleError<any>('deleteCup'))
    );
  }

}
