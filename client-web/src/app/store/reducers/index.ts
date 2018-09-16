//#region Imports
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { Params, RouterStateSnapshot } from '@angular/router';
import {
    routerReducer,
    RouterReducerState,
    RouterStateSerializer
} from '@ngrx/router-store';
//#endregion

export interface RouterStateUrl {
    url: string;
    queryParams: Params;
    params: Params;
}

export interface State {
    routerReducer: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
    routerReducer: routerReducer
};

export const getRouterState = createFeatureSelector<
    RouterReducerState<RouterStateUrl>
>('routerReducer');

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
    serialize(routerState: RouterStateSnapshot): RouterStateUrl {
        let route = routerState.root;

        while (route.firstChild) {
            route = route.firstChild;
        }

        const {
            url,
            root: { queryParams }
        } = routerState;
        const { params } = route;

        // Only return an object including the URL, params and query params
        // instead of the entire snapshot
        return { url, params, queryParams };
    }
}
