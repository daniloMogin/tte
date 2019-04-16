import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_ROOT, authToken, handleError } from './shared';

@Injectable({
  providedIn: 'root'
})
export class CupsService {

  private API_CUP_URL = API_ROOT + 'cup/';

  constructor(private http: HttpClient) { }

  getCups(): Observable<any> {

    const header = new HttpHeaders({
      Authorization: 'Bearer ' + authToken.replace('JWT ', '')
    });

    return this.http.get<any>(this.API_CUP_URL,  { headers: header })
    .pipe(
      catchError(handleError<any>('getCup'))
    );
  }

  createCup(cup: object): Observable<any> {
    return this.http.post<any>(this.API_CUP_URL, cup)
    .pipe(
      catchError(handleError<any>('createCup'))
    );

  }

  getCupById(id: string): Observable<any> {
    return this.http.get<any>(this.API_CUP_URL + id)
    .pipe(
      catchError(handleError<any>('getCupById'))
    );
  }

  updateCup(id: string, cup: object): Observable<any> {
    return this.http.put<any>(this.API_CUP_URL + id , cup)
    .pipe(
      catchError(handleError<any>('updateCup'))
    );
  }

  deleteCup(id: string): Observable<any> {
    return this.http.delete<any>(this.API_CUP_URL + id)
    .pipe(
      catchError(handleError<any>('deleteCup'))
    );
  }

}
