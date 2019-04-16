import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
private API_ROOT = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) { }

  getGroup(): Observable<any> {
    return this.http.get<any>(this.API_ROOT + 'group')
  }

  createGroup(group: object): Observable<any> {
    return this.http.post<any>(this.API_ROOT + 'group', group)

  }

  getCupById(id): Observable<any> {
    return this.http.get<any>(this.API_ROOT + 'group/' + id)
  }

  updateGroup(id, group: object): Observable<any> {
    return this.http.put<any>(this.API_ROOT + 'group/' + id , group)
  }

  deleteGroup(id, group: object): Observable<any> {
    return this.http.delete<any>(this.API_ROOT + 'group/' + id, group)
  }

}
