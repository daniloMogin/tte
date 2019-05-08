import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { handleError, getHeaders, API_ROOT } from './shared';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_AUTH_URL = API_ROOT + 'auth/';

  constructor(private http: HttpClient, private router: Router) {
  }

  /*setToken(token: string): void {
    this.authToken = token;
    console.log('Set token: ' + this.authToken);
  }

  getToken(): string {
    return this.authToken;
  }*/

  registerUser(user: object): Observable<any> {
    return this.http.post<any>(this.API_AUTH_URL + 'register', user)
    .pipe(
      catchError(handleError<any>('registerUser'))
    )
  }

  loginUser(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.API_AUTH_URL + 'login', {username: username, password: password})
    .pipe(
      catchError(handleError<any>('loginUser'))
    );
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return localStorage.getItem('token');
  }

}
