import { Action } from '@ngrx/store';
// import { any } from '../../models/Game.model';

// load Games
export const LOAD_GAMES = '[Games] Load Games';
export const LOAD_GAMES_FAIL = '[Games] Load Games Fail';
export const LOAD_GAMES_SUCCESS = '[Games] Load Games Success';

export class LoadGames implements Action {
    readonly type = LOAD_GAMES;
}

export class LoadGamesFail implements Action {
    readonly type = LOAD_GAMES_FAIL;
    constructor(public payload: any) {}
}

export class LoadGamesSuccess implements Action {
    readonly type = LOAD_GAMES_SUCCESS;
    constructor(public payload: any[]) {}
}

// load Games by ID
export const LOAD_GAME_BY_ID = '[Games] Load Game by id';
export const LOAD_GAME_BY_ID_FAIL = '[Games] Load Game by id Fail';
export const LOAD_GAME_BY_ID_SUCCESS = '[Games] Load Game by id Success';

export class LoadGameById implements Action {
    readonly type = LOAD_GAME_BY_ID;
    constructor(public payload: any) {}
}

export class LoadGameByIdFail implements Action {
    readonly type = LOAD_GAME_BY_ID_FAIL;
    constructor(public payload: any) {}
}

export class LoadGameByIdSuccess implements Action {
    readonly type = LOAD_GAME_BY_ID_SUCCESS;
    constructor(public payload: any) {}
}

// action types
export type GameAction =
    | LoadGames
    | LoadGamesFail
    | LoadGamesSuccess
    | LoadGameById
    | LoadGameByIdFail
    | LoadGameByIdSuccess;
