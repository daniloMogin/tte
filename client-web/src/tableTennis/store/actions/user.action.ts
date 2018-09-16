import { Action } from '@ngrx/store';
import { IUser } from '../../models/user.model';

// load users
export const LOAD_USERS = '[Users] Load Users';
export const LOAD_USERS_FAIL = '[Users] Load Users Fail';
export const LOAD_USERS_SUCCESS = '[Users] Load Users Success';

export class LoadUsers implements Action {
    readonly type = LOAD_USERS;
}

export class LoadUsersFail implements Action {
    readonly type = LOAD_USERS_FAIL;
    constructor(public payload: any) {}
}

export class LoadUsersSuccess implements Action {
    readonly type = LOAD_USERS_SUCCESS;
    constructor(public payload: IUser[]) {}
}

// load users by ID
export const LOAD_USER_BY_ID = '[Users] Load User by id';
export const LOAD_USER_BY_ID_FAIL = '[Users] Load User by id Fail';
export const LOAD_USER_BY_ID_SUCCESS = '[Users] Load User by id Success';

export class LoadUserById implements Action {
    readonly type = LOAD_USER_BY_ID;
    constructor(public payload: IUser) {}
}

export class LoadUserByIdFail implements Action {
    readonly type = LOAD_USER_BY_ID_FAIL;
    constructor(public payload: any) {}
}

export class LoadUserByIdSuccess implements Action {
    readonly type = LOAD_USER_BY_ID_SUCCESS;
    constructor(public payload: IUser) {}
}

// login user
export const LOGIN_USER = '[Users] Login User';
export const LOGIN_USER_FAIL = '[Users] Login User Fail';
export const LOGIN_USER_SUCCESS = '[Users] Login User Success';

export class LoginUser implements Action {
    readonly type = LOGIN_USER;
    constructor(public payload: IUser) {}
}

export class LoginUserFail implements Action {
    readonly type = LOGIN_USER_FAIL;
    constructor(public payload: any) {}
}

export class LoginUserSuccess implements Action {
    readonly type = LOGIN_USER_SUCCESS;
    constructor(public payload: IUser) {}
}

// action types
export type UserAction =
    | LoadUsers
    | LoadUsersFail
    | LoadUsersSuccess
    | LoadUserById
    | LoadUserByIdFail
    | LoadUserByIdSuccess
    | LoginUser
    | LoginUserFail
    | LoginUserSuccess;
