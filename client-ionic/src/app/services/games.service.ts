import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from './api-service';

@Injectable({
  providedIn: 'root'
})
export class GamesService extends ApiService {

  private API_GAMES_URL = this.API_ROOT + 'game/';

  constructor(private http: HttpClient) {
    super();
  }

  getGames(): Observable<any> {

    return this.http.get<any>(this.API_GAMES_URL, { headers: this.getHeaders() })
    .pipe(
      catchError(this.handleError<any>('getGame'))
    );
  }

  createGame(game: object): Observable<any> {
    return this.http.post<any>(this.API_GAMES_URL, game, { headers: this.getHeaders() })
    .pipe(
      catchError(this.handleError<any>('createGame'))
    );

  }

  getGameById(id: string): Observable<any> {
    return this.http.get<any>(this.API_GAMES_URL + id, { headers: this.getHeaders() })
    .pipe(
      catchError(this.handleError<any>('getGameById'))
    );
  }

  updateGame(id: string, game: object): Observable<any> {
    return this.http.put<any>(this.API_GAMES_URL + id , game, { headers: this.getHeaders() })
    .pipe(
      catchError(this.handleError<any>('updateGame'))
    );
  }

  deleteGame(id: string): Observable<any> {
    return this.http.delete<any>(this.API_GAMES_URL + id, { headers: this.getHeaders() })
    .pipe(
      catchError(this.handleError<any>('deleteGame'))
    );
  }

}
