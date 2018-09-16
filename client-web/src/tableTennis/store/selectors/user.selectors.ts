import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromUsers from '../reducers/user.reducer';

import { IUser } from '../../models/user.model';

export const getUserState = createSelector(
    fromFeature.getTableTennisState,
    (state: fromFeature.TableTennisState) => state.usersLogin
);

export const getUserEntities = createSelector(
    getUserState,
    fromUsers.getUserLoginEntities
);

// export const getSelectedUser = createSelector(
//     getUserEntities,
//     fromRoot.getRouterState,
//     (entities, router): IUser => {
//         return router.state && entities[router.state.params.userId];
//     }
// );

export const getAllUsers = createSelector(getUserEntities, entities => {
    return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
});

export const getUserLoaded = createSelector(
    getUserState,
    fromUsers.getUserLoginLoaded
);

export const getUserLoading = createSelector(
    getUserState,
    fromUsers.getUserLoginLoading
);
