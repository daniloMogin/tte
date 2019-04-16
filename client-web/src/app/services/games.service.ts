import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_ROOT, handleError } from './shared';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private API_GAMES_URL = API_ROOT + 'games/';

  constructor(private http: HttpClient) { }

  getGame(): Observable<any> {

    return this.http.get<any>(this.API_GAMES_URL)
    .pipe(
      catchError(handleError<any>('getGame'))
    );
  }

  createGame(game: object): Observable<any> {
    return this.http.post<any>(this.API_GAMES_URL, game)
    .pipe(
      catchError(handleError<any>('createGame'))
    );

  }

  getGameById(id: string): Observable<any> {
    return this.http.get<any>(this.API_GAMES_URL + id)
    .pipe(
      catchError(handleError<any>('getGameById'))
    );
  }

  updateGame(id: string, game: object): Observable<any> {
    return this.http.put<any>(this.API_GAMES_URL + id , game)
    .pipe(
      catchError(handleError<any>('updateGame'))
    );
  }

  deleteGame(id: string): Observable<any> {
    return this.http.delete<any>(this.API_GAMES_URL + id)
    .pipe(
      catchError(handleError<any>('deleteGame'))
    );
  }

}