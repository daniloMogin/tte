import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {

  private API_AUTH_URL = this.API_ROOT + 'auth/';

  constructor(private http: HttpClient) {
    super();
  }

  registerUser(user: object): Observable<any> {
    return this.http.post<any>(this.API_AUTH_URL + 'register', user, { headers: this.getHeaders() })
    .pipe(
      catchError(this.handleError<any>('registerUser'))
    )
  }

  loginUser(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.API_AUTH_URL + 'Login', {username: username, password: password}, { headers: this.getHeaders() })
    .pipe(
      catchError(this.handleError<any>('loginUser'))
    );
  }

  logoutUser() {

  }

  isLoggedIn() {

  }

}
