import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_ROOT, handleError } from './shared';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private API_ROLES_URL = API_ROOT + 'roles/';

  constructor(private http: HttpClient) { }

  getRole(): Observable<any> {

    return this.http.get<any>(this.API_ROLES_URL)
    .pipe(
      catchError(handleError<any>('getRole'))
    );
  }

  createRole(role: object): Observable<any> {
    return this.http.post<any>(this.API_ROLES_URL, role)
    .pipe(
      catchError(handleError<any>('createRole'))
    );

  }

  getRoleById(id: string): Observable<any> {
    return this.http.get<any>(this.API_ROLES_URL + id)
    .pipe(
      catchError(handleError<any>('getRoleById'))
    );
  }

  updateRole(id: string, role: object): Observable<any> {
    return this.http.put<any>(this.API_ROLES_URL + id , role)
    .pipe(
      catchError(handleError<any>('updateRole'))
    );
  }

}
