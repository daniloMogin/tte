//#region Imports
import * as fromUsers from '../actions/user.action';
import { IUser } from '../../models/user.model';
import * as _ from 'lodash';
//#endregion

export interface UserByIdState {
    entities: { [id: number]: IUser };
    loaded: boolean;
    loading: boolean;
}

export const initialState: UserByIdState = {
    entities: {},
    loaded: false,
    loading: false
};

export function reducer(
    state = initialState,
    action: fromUsers.UserAction
): UserByIdState {
    switch (action.type) {
        case fromUsers.LOAD_USER_BY_ID: {
            return {
                ...state,
                loading: true
            };
        }
        case fromUsers.LOAD_USER_BY_ID_SUCCESS: {
            const users: any = action.payload;
            const entities = {
                ...state.entities,
                [users.msg._id]: users.user
            };
            return {
                ...state,
                loaded: true,
                loading: false,
                entities
            };
        }
        case fromUsers.LOAD_USER_BY_ID_FAIL: {
            const error: any = action.payload;
            const entities = {
                ...state.entities,
                [error.status]: error.error.msg.message
            };
            return {
                ...state,
                loaded: true,
                loading: false,
                entities
            };
        }
    }
    return state;
}
export const getUserByIdEntities = (state: UserByIdState) => state.entities;
export const getUserByIdLoaded = (state: UserByIdState) => state.loaded;
export const getUserByIdLoading = (state: UserByIdState) => state.loading;
