//#region Import
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import { CookieService } from 'ngx-cookie-service';

import { IUser } from '../models/user.model';
//#endregion

const userApi: string = 'http://localhost:3000/api/users';
const userLoginApi: string = 'http://localhost:3000/api/auth/login';

@Injectable()
export class UserService {
    constructor(
        private http: HttpClient,
        private _cookieService: CookieService
    ) {}

    getUsers(): Observable<IUser[]> {
        const auth: string = this._cookieService.get('authUser');
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: auth
            })
        };
        return this.http
            .get<IUser[]>(userApi, httpOptions)
            .pipe(catchError((error: any) => Observable.throw(error)));
    }

    getUserById(payload: IUser): Observable<IUser> {
        const auth: string = this._cookieService.get('authUser');
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: auth
            })
        };
        return this.http
            .get<IUser>(`${userApi}/${payload}`, httpOptions)
            .pipe(catchError((error: any) => Observable.throw(error)));
    }

    loginUser(payload: IUser): Observable<IUser> {
        return this.http
            .post<IUser>(userLoginApi, payload)
            .pipe(catchError((error: any) => Observable.throw(error)));
    }
}
