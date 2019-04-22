import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {

  private API_AUTH_URL = this.API_ROOT + 'auth/';

  constructor(private http: HttpClient, private router: Router) {
    super();
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
      catchError(this.handleError<any>('registerUser'))
    )
  }

  loginUser(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.API_AUTH_URL + 'login', {username: username, password: password})
    .pipe(
      catchError(this.handleError<any>('loginUser'))
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
