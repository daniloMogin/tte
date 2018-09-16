//#region Imports
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { CookieService } from 'ngx-cookie-service';

import * as fromRoot from '../../../app/store';
import * as userActions from '../actions';
import * as userService from '../../services';
//#endregion

@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private _userService: userService.UserService,
        private _cookieService: CookieService
    ) {}

    @Effect()
    loadUsers$ = this.actions$.ofType(userActions.LOAD_USERS).pipe(
        switchMap(() => {
            return this._userService.getUsers().pipe(
                map(users => new userActions.LoadUsersSuccess(users)),
                catchError(error => of(new userActions.LoadUsersFail(error)))
            );
        })
    );

    @Effect()
    loadUserById$ = this.actions$.ofType(userActions.LOAD_USER_BY_ID).pipe(
        map((action: userActions.LoadUserById) => action.payload),
        switchMap(user => {
            return this._userService.getUserById(user).pipe(
                map(user => new userActions.LoadUserByIdSuccess(user)),
                catchError(error => of(new userActions.LoadUserByIdFail(error)))
            );
        })
    );

    @Effect()
    loginUser$ = this.actions$.ofType(userActions.LOGIN_USER).pipe(
        map((action: userActions.LoginUser) => action.payload),
        switchMap(user => {
            return this._userService.loginUser(user).pipe(
                map(user => new userActions.LoginUserSuccess(user)),
                catchError(error => of(new userActions.LoginUserFail(error)))
            );
        })
    );

    @Effect()
    handleLoginSuccess$ = this.actions$
        .ofType(userActions.LOGIN_USER_SUCCESS)
        .pipe(
            map((action: userActions.LoginUserSuccess) => action.payload),
            map((user: any) => {
                this._cookieService.set('authUser', user.msg.token);
                return new fromRoot.Go({
                    path: ['tt/user-list']
                });
            })
        );
}
