import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
private API_ROOT = 'http://localhost:3000/api/';
private apiGroup = this.API_ROOT + 'group/';

  constructor(private http: HttpClient) { }

  getGroup(): Observable<any> {

    return this.http.get<any>(api)
    .pipe(
      catchError(this.handleError<any>('getGroup'))
    );
  }

  createGroup(group: object): Observable<any> {
    return this.http.post<any>(api, group)
    .pipe(
      catchError(this.handleError<any>('createGroup'))
    );

  }

  getCupById(id): Observable<any> {
    return this.http.get<any>(this.API_ROOT + 'group/' + id)
    .pipe(
      catchError(this.handleError<any>('getCupById'))
    );
  }

  updateGroup(id, group: object): Observable<any> {
    return this.http.put<any>(this.API_ROOT + 'group/' + id , group)
    .pipe(
      catchError(this.handleError<any>('updateGroup'))
    );
  }

  deleteGroup(id, group: object): Observable<any> {
    return this.http.delete<any>(this.API_ROOT + 'group/' + id, group)
    .pipe(
      catchError(this.handleError<any>('deleteGroup'))
    );
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(this.API_ROOT + 'users/')
    .pipe(
      catchError(this.handleError<any>('getUsers'))
    );
  }

  createUsers(user: object): Observable<any> {
    return this.http.post<any>(this.API_ROOT + 'users/', user)
    .pipe(
      catchError(this.handleError<any>('createUsers'))
    );

  }
  getUserById(id): Observable<any> {
    return this.http.get<any>(this.API_ROOT + 'users/' + id)
    .pipe(
      catchError(this.handleError<any>('getUserById'))
    );
  }
  updateUser(id, user: object): Observable<any> {
    return this.http.put<any>(this.API_ROOT + 'users/' + id , user)
    .pipe(
      catchError(this.handleError<any>('updateUser'))
    );
  }
}
