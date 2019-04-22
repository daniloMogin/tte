import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ApiService } from './api-service';

@Injectable({
  providedIn: 'root'
})
export class GroupsService extends ApiService {

  private API_GROUP_URL = this.API_ROOT + 'group/';

  constructor(private http: HttpClient) {
    super()
   }
  
  getGroup(): Observable<any> {
    

    return this.http.get<any>(this.API_GROUP_URL, {headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError<any>('getGroup'))
      );
  }

  createGroup(group: object): Observable<any> {
    return this.http.post<any>(this.API_GROUP_URL, group, {headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError<any>('createGroup'))
      );

  }

  getGroupById(id: string): Observable<any> {
    return this.http.get<any>(this.API_GROUP_URL + id, {headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError<any>('getGroupById'))
      );
  }

  updateGroup(id: string, group: any): Observable<any> {
    group.teams = group.teams.join(',');
    return this.http.put<any>(this.API_GROUP_URL + id, group, {headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError<any>('updateGroup'))
      );
  }

  deleteGroup(id: string): Observable<any> {
    return this.http.delete<any>(this.API_GROUP_URL + id, {headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError<any>('deleteGroup'))
      );
  }
}
