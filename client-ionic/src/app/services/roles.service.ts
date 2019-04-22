import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from './api-service';

@Injectable({
  providedIn: 'root'
})
export class RolesService extends ApiService {

  private API_ROLES_URL = this.API_ROOT + 'roles/';

  constructor(private http: HttpClient,) {
    super();
   }

  getRole(): Observable<any> {

    return this.http.get<any>(this.API_ROLES_URL, { headers: this.getHeaders() })
    .pipe(
      catchError(this.handleError<any>('getRole'))
    );
  }

  createRole(role: object): Observable<any> {
    return this.http.post<any>(this.API_ROLES_URL, role, { headers: this.getHeaders() })
    .pipe(
      catchError(this.handleError<any>('createRole'))
    );

  }

  getRoleById(id: string): Observable<any> {
    return this.http.get<any>(this.API_ROLES_URL + id, { headers: this.getHeaders() })
    .pipe(
      catchError(this.handleError<any>('getRoleById'))
    );
  }

  updateRole(id: string, role: object): Observable<any> {
    return this.http.put<any>(this.API_ROLES_URL + id , role, { headers: this.getHeaders() })
    .pipe(
      catchError(this.handleError<any>('updateRole'))
    );
  }

}
