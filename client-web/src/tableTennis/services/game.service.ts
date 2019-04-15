//#region Import
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import { CookieService } from 'ngx-cookie-service';

// import { any } from '../models/user.model';
//#endregion

const gameApi: string = 'http://localhost:3000/api/game';

@Injectable()
export class GameService {
    constructor(
        private http: HttpClient,
        private _cookieService: CookieService
    ) {}

    getGames(): Observable<any[]> {
        const auth: string = this._cookieService.get('authUser');
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: auth
            })
        };
        return this.http
            .get<any[]>(gameApi, httpOptions)
            .pipe(catchError((error: any) => Observable.throw(error)));
    }

    getGameById(payload: any): Observable<any> {
        const auth: string = this._cookieService.get('authUser');
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: auth
            })
        };
        return this.http
            .get<any>(`${gameApi}/${payload}`, httpOptions)
            .pipe(catchError((error: any) => Observable.throw(error)));
    }
}
