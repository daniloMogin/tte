import { Request } from 'express';
import GameModel from '../../models/game.server.model';
import UserModel from '../../models/user.server.model';
import * as fromInterfaces from './../../models/interfaces/index';

export default class GameDBCalls {
    /**
     * 
                        'teams createdBy modifiedBy score',
                        '-password -__v'
     */
    public findGame() {
        return new Promise(resolve => {
            try {
                GameModel.find()
                    .populate('teams createdBy modifiedBy', '-password -__v')
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        resolve(error);
                    });
            } catch (err) {
                console.error(err);
            }
        });
    }

    public findGameById(req: Request) {
        return new Promise(resolve => {
            try {
                GameModel.findById(req.params.id)
                    .populate(
                        'teams createdBy modifiedBy score',
                        '-password -__v'
                    )
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        resolve(error);
                    });
            } catch (err) {
                console.error(err);
            }
        });
    }

    /**
     * 
     * @param name 
                        'teams createdBy modifiedBy score',
                        '-password -__v'
     */
    public findGameByName(name) {
        return new Promise(resolve => {
            try {
                GameModel.findOne({ name })
                    .populate('createdBy modifiedBy', '-password -__v')
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        resolve(error);
                    });
            } catch (err) {
                console.error(err);
            }
        });
    }

    public createGame(game: fromInterfaces.IGame) {
        return new Promise(resolve => {
            try {
                // console.log(`======================= game =======================`);
                // console.log(game);
                
                const result: fromInterfaces.IGame = new GameModel({
                    name: game.name,
                    description: game.description,
                    active: game.active,
                    teams: game.teams,
                    createdBy: game.createdBy,
                    modifiedBy: game.modifiedBy,
                    createdAt: game.createdAt
                });
                result
                    .save()
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        resolve(error);
                    });
            } catch (err) {
                console.error(err);
            }
        });
    }

    public updateGame(game: fromInterfaces.IGame, req: Request) {
        return new Promise(resolve => {
            try {
                const gameUpdate = {
                    name: game.name,
                    description: game.description,
                    active: game.active,
                    teams: game.teams,
                    score: game.score,
                    winner: game.winner,
                    modifiedBy: game.modifiedBy,
                    updatedAt: game.updatedAt
                };
                GameModel.findByIdAndUpdate(req.params.id, gameUpdate, {
                    select: '-password',
                    upsert: false,
                    new: true
                })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        resolve(error);
                    });
            } catch (err) {
                console.error(err);
            }
        });
    }

    public deleteGame(req: Request) {
        return new Promise(resolve => {
            try {
                GameModel.findByIdAndRemove(req.params.id)
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        resolve(error);
                    });
            } catch (err) {
                console.error(err);
            }
        });
    }
}
