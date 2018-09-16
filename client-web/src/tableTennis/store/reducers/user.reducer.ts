//#region Imports
import * as fromUsers from '../actions/user.action';
import { IUser } from '../../models/user.model';
import * as _ from 'lodash';
//#endregion

export interface UserLoginState {
    entities: { [id: number]: IUser };
    loaded: boolean;
    loading: boolean;
}

export const initialState: UserLoginState = {
    entities: {},
    loaded: false,
    loading: false
};

export function reducer(
    state = initialState,
    action: fromUsers.UserAction
): UserLoginState {
    switch (action.type) {
        case fromUsers.LOGIN_USER: {
            return {
                ...state,
                loading: true
            };
        }
        case fromUsers.LOGIN_USER_SUCCESS: {
            const users: any = action.payload;
            let entities;
            if (_.isNil(users.error)) {
                entities = {
                    ...state.entities,
                    [users.msg._id]: users.msg
                };
            } else {
                entities = {
                    ...state.entities,
                    [`error`]: users.error.message
                };
            }
            return {
                ...state,
                loaded: true,
                loading: false,
                entities
            };
        }
        case fromUsers.LOGIN_USER_FAIL: {
            const error: any = action.payload;
            const entities = {
                ...state.entities,
                [error.status]: error.error.message
            };
            return {
                ...state,
                loaded: false,
                loading: false,
                entities
            };
        }
    }
    return state;
}
export const getUserLoginEntities = (state: UserLoginState) => state.entities;
export const getUserLoginLoaded = (state: UserLoginState) => state.loaded;
export const getUserLoginLoading = (state: UserLoginState) => state.loading;
