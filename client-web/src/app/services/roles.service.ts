import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { handleError, getHeaders, this.shared.API_ROOT } from './shared';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private API_ROLES_URL = this.shared.API_ROOT + 'roles/';

  constructor(private http: HttpClient) {
    ;
   }

  getRole(): Observable<any> {

    return this.http.get<any>(this.API_ROLES_URL, { headers: this.shared.getHeaders() })
    .pipe(
      catchError(this.shared.handleError<any>('getRole'))
    );
  }

  createRole(role: object): Observable<any> {
    return this.http.post<any>(this.API_ROLES_URL, role, { headers: this.shared.getHeaders() })
    .pipe(
      catchError(this.shared.handleError<any>('createRole'))
    );

  }

  getRoleById(id: string): Observable<any> {
    return this.http.get<any>(this.API_ROLES_URL + id, { headers: this.shared.getHeaders() })
    .pipe(
      catchError(this.shared.handleError<any>('getRoleById'))
    );
  }

  updateRole(id: string, role: object): Observable<any> {
    return this.http.put<any>(this.API_ROLES_URL + id , role, { headers: this.shared.getHeaders() })
    .pipe(
      catchError(this.shared.handleError<any>('updateRole'))
    );
  }

}
