//#region Imports
import * as fromUsers from '../actions/user.action';
import { IUser } from '../../models/user.model';
import * as _ from 'lodash';
//#endregion

export interface UserListState {
    entities: { [id: number]: IUser };
    loaded: boolean;
    loading: boolean;
}

export const initialState: UserListState = {
    entities: {},
    loaded: false,
    loading: false
};

export function reducer(
    state = initialState,
    action: fromUsers.UserAction
): UserListState {
    switch (action.type) {
        case fromUsers.LOAD_USERS: {
            return {
                ...state,
                loading: true
            };
        }
        case fromUsers.LOAD_USERS_SUCCESS: {
            const users: any = action.payload;
            const entities = users.reduce(
                (entitie, user: IUser) => {
                    return {
                        ...entitie,
                        [user._id]: user
                    };
                },
                {
                    ...state.entities
                }
            );
            return {
                ...state,
                loaded: true,
                loading: false,
                entities
            };
        }
        case fromUsers.LOAD_USERS_FAIL: {
            return {
                ...state,
                loaded: false,
                loading: false
            };
        }
    }
    return state;
}
export const getUserListEntities = (state: UserListState) => state.entities;
export const getUserListLoaded = (state: UserListState) => state.loaded;
export const getUserListLoading = (state: UserListState) => state.loading;
