import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private API_ROOT = 'http://localhost:3000/api/';
private API_CUP_URL = this.API_ROOT + 'users/';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get<any>(this.API_CUP_URL)
    .pipe(
      catchError(this.handleError<any>('getUsers'))
    );
  }

  createUsers(user: object): Observable<any> {
    return this.http.post<any>(this.API_CUP_URL, user)
    .pipe(
      catchError(this.handleError<any>('createUsers'))
    );

  }
  getUserById(id: string): Observable<any> {
    return this.http.get<any>(this.API_CUP_URL + id)
    .pipe(
      catchError(this.handleError<any>('getUserById'))
    );
  }
  getUserByRole(role: string): Observable<any> {
    return this.http.get<any>(this.API_CUP_URL + 'byRole/' + role)
    .pipe(
      catchError(this.handleError<any>('getUserByRole'))
    );
  }
  updateUser(id: string, user: object): Observable<any> {
    return this.http.put<any>(this.API_CUP_URL + id , user)
    .pipe(
      catchError(this.handleError<any>('updateUser'))
    );
  }
}
