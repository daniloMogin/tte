import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { handleError, getHeaders, API_ROOT } from './shared';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  private API_GROUP_URL = API_ROOT + 'group/';

  constructor(private http: HttpClient) {
    
   }
  
  getGroup(): Observable<any> {
    

    return this.http.get<any>(this.API_GROUP_URL, {headers: getHeaders() })
      .pipe(
        catchError(handleError<any>('getGroup', {group: []}))
      );
  }

  createGroup(group: object): Observable<any> {
    return this.http.post<any>(this.API_GROUP_URL, group, {headers: getHeaders() })
      .pipe(
        catchError(handleError<any>('createGroup'))
      );

  }

  getGroupById(id: string): Observable<any> {
    return this.http.get<any>(this.API_GROUP_URL + id, {headers: getHeaders() })
      .pipe(
        catchError(handleError<any>('getGroupById'))
      );
  }

  updateGroup(id: string, group: any): Observable<any> {
    //group.teams = group.teams.join(',');
    return this.http.put<any>(this.API_GROUP_URL + id, group, {headers: getHeaders() })
      .pipe(
        catchError(handleError<any>('updateGroup'))
      );
  }

  deleteGroup(id: string): Observable<any> {
    return this.http.delete<any>(this.API_GROUP_URL + id, {headers: getHeaders() })
      .pipe(
        catchError(handleError<any>('deleteGroup'))
      );
  }
}
