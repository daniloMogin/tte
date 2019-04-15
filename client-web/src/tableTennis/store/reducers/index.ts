import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromUsers from './user.reducer';
import * as fromUserList from './user-list.reducer';
import * as fromUserId from './user-id.reducer';
import * as fromGamesList from './game.reducer';

export interface TableTennisState {
    usersLogin: fromUsers.UserLoginState;
    userList: fromUserList.UserListState;
    userById: fromUserId.UserByIdState;
    gameList: fromGamesList.GameListState;
}

export const reducers: ActionReducerMap<TableTennisState> = {
    usersLogin: fromUsers.reducer,
    userList: fromUserList.reducer,
    userById: fromUserId.reducer,
    gameList: fromGamesList.reducer
};

export const getTableTennisState = createFeatureSelector<TableTennisState>(
    'tableTennis'
);
