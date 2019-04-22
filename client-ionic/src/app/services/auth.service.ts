import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {

  private API_AUTH_URL = this.API_ROOT + 'auth/';

  constructor(private http: HttpClient) {
    super();
  }

  registerUser() {

  }

  loginUser() {

  }

  logoutUser() {

  }

  isLoggedIn() {

  }

}
