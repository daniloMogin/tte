import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromUsers from './user.reducer';
import * as fromUserList from './user-list.reducer';
import * as fromUserId from './user-id.reducer';

export interface TableTennisState {
    usersLogin: fromUsers.UserLoginState;
    userList: fromUserList.UserListState;
    userById: fromUserId.UserByIdState;
}

export const reducers: ActionReducerMap<TableTennisState> = {
    usersLogin: fromUsers.reducer,
    userList: fromUserList.reducer,
    userById: fromUserId.reducer
};

export const getTableTennisState = createFeatureSelector<TableTennisState>(
    'tableTennis'
);
