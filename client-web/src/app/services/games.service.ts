import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { handleError, getHeaders, this.shared.API_ROOT } from './shared';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private API_GAMES_URL = this.shared.API_ROOT + 'game/';

  constructor(private http: HttpClient) {
    ;
  }

  getGames(): Observable<any> {

    return this.http.get<any>(this.API_GAMES_URL, { headers: this.shared.getHeaders() })
    .pipe(
      catchError(this.shared.handleError<any>('getGame'))
    );
  }

  createGame(game: object): Observable<any> {
    return this.http.post<any>(this.API_GAMES_URL, game, { headers: this.shared.getHeaders() })
    .pipe(
      catchError(this.shared.handleError<any>('createGame'))
    );

  }

  getGameById(id: string): Observable<any> {
    return this.http.get<any>(this.API_GAMES_URL + id, { headers: this.shared.getHeaders() })
    .pipe(
      catchError(this.shared.handleError<any>('getGameById'))
    );
  }

  updateGame(id: string, game: object): Observable<any> {
    return this.http.put<any>(this.API_GAMES_URL + id , game, { headers: this.shared.getHeaders() })
    .pipe(
      catchError(this.shared.handleError<any>('updateGame'))
    );
  }

  deleteGame(id: string): Observable<any> {
    return this.http.delete<any>(this.API_GAMES_URL + id, { headers: this.shared.getHeaders() })
    .pipe(
      catchError(this.shared.handleError<any>('deleteGame'))
    );
  }

}
