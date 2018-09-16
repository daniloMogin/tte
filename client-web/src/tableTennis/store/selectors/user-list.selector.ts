import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromUsersList from '../reducers/user-list.reducer';

import { IUser } from '../../models/user.model';

export const getUserListState = createSelector(
    fromFeature.getTableTennisState,
    (state: fromFeature.TableTennisState) => state.userList
);

export const getUserListEntities = createSelector(
    getUserListState,
    fromUsersList.getUserListEntities
);

export const getSelectedUser = createSelector(
    getUserListEntities,
    fromRoot.getRouterState,
    (entities, router): IUser => {
        return router.state && entities[router.state.params.userId];
    }
);

export const getUsersList = createSelector(getUserListEntities, entities => {
    return Object.keys(entities).map(id => entities[id]);
});

export const getUserListLoaded = createSelector(
    getUserListState,
    fromUsersList.getUserListLoaded
);

export const getUserListLoading = createSelector(
    getUserListState,
    fromUsersList.getUserListLoading
);
