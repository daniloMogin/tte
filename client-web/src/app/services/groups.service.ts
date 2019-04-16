import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_ROOT, authToken, handleError } from './shared';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  private API_GROUP_URL = API_ROOT + 'group/';

  constructor(private http: HttpClient) { }

  getGroup(): Observable<any> {
    const header = new HttpHeaders({
      Authorization: 'Bearer ' + authToken
    });

    return this.http.get<any>(this.API_GROUP_URL, {headers: header})
      .pipe(
        catchError(handleError<any>('getGroup'))
      );
  }

  createGroup(group: object): Observable<any> {
    return this.http.post<any>(this.API_GROUP_URL, group)
      .pipe(
        catchError(handleError<any>('createGroup'))
      );

  }

  getGroupById(id: string): Observable<any> {
    return this.http.get<any>(this.API_GROUP_URL + id)
      .pipe(
        catchError(handleError<any>('getGroupById'))
      );
  }

  updateGroup(id: string, group: object): Observable<any> {
    return this.http.put<any>(this.API_GROUP_URL + id, group)
      .pipe(
        catchError(handleError<any>('updateGroup'))
      );
  }

  deleteGroup(id: string): Observable<any> {
    return this.http.delete<any>(this.API_GROUP_URL + id)
      .pipe(
        catchError(handleError<any>('deleteGroup'))
      );
  }
}
