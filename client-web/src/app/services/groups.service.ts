import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { handleError, getHeaders, this.shared.API_ROOT } from './shared';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  private API_GROUP_URL = this.shared.API_ROOT + 'group/';

  constructor(private http: HttpClient) {
    
   }
  
  getGroup(): Observable<any> {
    

    return this.http.get<any>(this.API_GROUP_URL, {headers: this.shared.getHeaders() })
      .pipe(
        catchError(this.shared.handleError<any>('getGroup'))
      );
  }

  createGroup(group: object): Observable<any> {
    return this.http.post<any>(this.API_GROUP_URL, group)
      .pipe(
        catchError(this.shared.handleError<any>('createGroup'))
      );

  }

  getGroupById(id: string): Observable<any> {
    return this.http.get<any>(this.API_GROUP_URL + id, {headers: this.shared.getHeaders() })
      .pipe(
        catchError(this.shared.handleError<any>('getGroupById'))
      );
  }

  updateGroup(id: string, group: object): Observable<any> {
    return this.http.put<any>(this.API_GROUP_URL + id, group)
      .pipe(
        catchError(this.shared.handleError<any>('updateGroup'))
      );
  }

  deleteGroup(id: string): Observable<any> {
    return this.http.delete<any>(this.API_GROUP_URL + id)
      .pipe(
        catchError(this.shared.handleError<any>('deleteGroup'))
      );
  }
}
