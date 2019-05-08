import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { handleError, getHeaders, API_ROOT } from './shared';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
private API_CUP_URL = API_ROOT + 'users/';

  constructor(private http: HttpClient) {
    
   }

  getUsers(): Observable<any> {
    return this.http.get<any>(this.API_CUP_URL, {headers: getHeaders()})
    .pipe(
      catchError(handleError<any>('getUsers'))
    );
  }

  createUsers(user: object): Observable<any> {
    return this.http.post<any>(this.API_CUP_URL, user)
    .pipe(
      catchError(handleError<any>('createUsers'))
    );

  }
  getUserById(id: string): Observable<any> {
    return this.http.get<any>(this.API_CUP_URL + id, {headers: getHeaders() })
    .pipe(
      catchError(handleError<any>('getUserById'))
    );
  }
  getUserByRole(role: string): Observable<any> {
    return this.http.get<any>(this.API_CUP_URL + 'byRole/' + role)
    .pipe(
      catchError(handleError<any>('getUserByRole'))
    );
  }
  updateUser(id: string, user: object): Observable<any> {
    return this.http.put<any>(this.API_CUP_URL + id , user)
    .pipe(
      catchError(handleError<any>('updateUser'))
    );
  }
}
