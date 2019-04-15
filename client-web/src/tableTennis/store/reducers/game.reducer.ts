//#region Imports
import * as fromGame from '../actions/game.action';
// import { IUser } from '../../models/user.model';
import * as _ from 'lodash';
//#endregion

export interface GameListState {
    entities: { [id: number]: any };
    loaded: boolean;
    loading: boolean;
}

export const initialState: GameListState = {
    entities: {},
    loaded: false,
    loading: false
};

export function reducer(
    state = initialState,
    action: fromGame.GameAction
): GameListState {
    switch (action.type) {
        case fromGame.LOAD_GAMES: {
            return {
                ...state,
                loading: true
            };
        }
        case fromGame.LOAD_GAMES_SUCCESS: {
            const games: any = action.payload;
            const entities = games.reduce(
                (entitie, game: any) => {
                    return {
                        ...entitie,
                        [game._id]: game
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
        case fromGame.LOAD_GAMES_FAIL: {
            return {
                ...state,
                loaded: false,
                loading: false
            };
        }
    }
    return state;
}
export const getGameListEntities = (state: GameListState) => state.entities;
export const getGameListLoaded = (state: GameListState) => state.loaded;
export const getGameListLoading = (state: GameListState) => state.loading;
