//#region Imports
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { CookieService } from 'ngx-cookie-service';

import * as fromRoot from '../../../app/store';
import * as fromActions from '../actions';
import * as fromServices from '../../services';
//#endregion

@Injectable()
export class GameEffects {
    constructor(
        private actions$: Actions,
        private _fromServices: fromServices.GameService,
        private _cookieService: CookieService
    ) {}

    @Effect()
    loadGames$ = this.actions$.ofType(fromActions.LOAD_GAMES).pipe(
        switchMap(() => {
            return this._fromServices.getGames().pipe(
                map(users => new fromActions.LoadGamesSuccess(users)),
                catchError(error => of(new fromActions.LoadGamesFail(error)))
            );
        })
    );

    @Effect()
    loadGameById$ = this.actions$.ofType(fromActions.LOAD_GAME_BY_ID).pipe(
        map((action: fromActions.LoadUserById) => action.payload),
        switchMap(user => {
            return this._fromServices.getGameById(user).pipe(
                map(user => new fromActions.LoadGameByIdSuccess(user)),
                catchError(error => of(new fromActions.LoadGameByIdFail(error)))
            );
        })
    );
}
