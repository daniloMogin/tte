//#region Imports
import { Request, Response } from 'express';
import * as passport from 'passport';
import * as _ from 'lodash';
import GameDBCalls from '../repo/game_repo/game.server.repo';
import UserDBCalls from '../repo/user_repo/user.server.repo';
import * as fromInterfaces from './../models/interfaces/index';
import Functions from '../share/functions.server';

const gameDB = new GameDBCalls();
const userDB = new UserDBCalls();
const func = new Functions();
//#endregion

export default class GameController {
    public getGames = (passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response) => {
        try {
            const token: string = func.getToken(req.headers);
            if (token) {
                const game:
                    | fromInterfaces.IGame[]
                    | any = await gameDB.findGame();
                if (game.length >= 0) {
                    res.status(200).json({
                        success: true,
                        game
                    });
                } else {
                    res.status(500).json({
                        success: false,
                        msg: game
                    });
                }
            } else {
                return res.status(403).send({
                    success: false,
                    msg: 'User is not authenticated!'
                });
            }
        } catch (err) {
            console.error(
                'Unable to fetch Games from the database, Error: ',
                err
            );
        }
    });

    public getGameById = (passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response) => {
        try {
            const token: string = func.getToken(req.headers);
            if (token) {
                const game:
                    | fromInterfaces.IGame
                    | any = await gameDB.findGameById(req);
                console.log(`findGame`);
                console.log(game);
                if (game !== null) {
                    res.status(200).json({
                        success: true,
                        game
                    });
                } else {
                    res.status(500).json({
                        success: false,
                        msg: game
                    });
                }
            } else {
                return res.status(403).send({
                    success: false,
                    msg: 'User is not authenticated!'
                });
            }
        } catch (err) {
            console.error(
                'Unable to fetch Game from the database, Error: ',
                err
            );
        }
    });

    public getGamesByName = (passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response) => {
        try {
            const token: string = func.getToken(req.headers);
            if (token) {
                const game: any = await gameDB.findGameByName(req.body.name);
                console.log(`findGames`);
                console.log(game);
                if (game.length > 0) {
                    res.status(200).json({
                        success: true,
                        game
                    });
                } else {
                    res.status(500).json({
                        success: false,
                        msg: game
                    });
                }
            } else {
                return res.status(403).send({
                    success: false,
                    msg: 'User is not authenticated!'
                });
            }
        } catch (err) {
            console.error(
                'Unable to fetch Game from the database, Error: ',
                err
            );
        }
    });

    // TODO: update user game nista nisam uradio sa response samo je upisan u niz
    public createGame = (passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response) => {
        const token: string = func.getToken(req.headers);
        if (token) {
            try {
                let teamsObjectArr: fromInterfaces.IUser[] = [];
                const teamsArr: string[] = req.body.teams.split(',');
                let teamsIdArr: number[] = [];
                for (let i: number = 0; i < teamsArr.length; i++) {
                    const findUserByUsername: any = await userDB.findUserByUsername(
                        teamsArr[i].trim(),
                        res
                    );
                    if (!_.isNil(findUserByUsername)) {
                        teamsIdArr.push(findUserByUsername._id);
                    }
                    teamsObjectArr.push(findUserByUsername);
                }
                const user: any = await func.decodeToken(token);
                const game: any = {
                    name: req.body.name,
                    description: req.body.description,
                    active: req.body.active,
                    teams: teamsIdArr,
                    createdBy: user._id,
                    modifiedBy: user._id,
                    createdAt: Date.now()
                };
                const createGame: any = await gameDB.createGame(game);
                const updateUser = [];
                for (const i of teamsObjectArr) {
                    updateUser.push(
                        userDB.updateUserGame(
                            i,
                            func.createGameIdArray(i, createGame),
                            user._id,
                            res
                        )
                    );
                }
                if (_.isNil(createGame.errors)) {
                    res.status(200).json({
                        success: true,
                        game: createGame
                    });
                } else {
                    res.status(500).json({
                        success: false,
                        msg: createGame
                    });
                }
            } catch (err) {
                console.error(
                    'Unable to connect to db and fetch all games. Error is ',
                    err
                );
            }
        } else {
            return res
                .status(403)
                .send({ success: false, msg: 'User is not authenticated!' });
        }
    });

    public updateGame = (passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response) => {
        const token: string = func.getToken(req.headers);
        if (token) {
            const user: any = await func.decodeToken(token);
            let game: fromInterfaces.IGame | any;
            let teamsObjectArr: fromInterfaces.IUser[] = [];
            let teamsIdArr: number[] = [];
            let teamsArr: string[];
            if (!_.isNil(req.body.teams)) {
                try {
                    teamsArr = req.body.teams.split(',');
                    for (let i: number = 0; i < teamsArr.length; i++) {
                        const findUserByUsername: any = await userDB.findUserByUsername(
                            teamsArr[i].trim(),
                            res
                        );
                        if (!_.isNil(findUserByUsername)) {
                            teamsIdArr.push(findUserByUsername._id);
                        }
                        teamsObjectArr.push(findUserByUsername);
                    }
                    const winnerId: any = await userDB.findUserByUsername(
                        req.body.winner,
                        res
                    );
                    game = {
                        name: req.body.name,
                        description: req.body.description,
                        active: req.body.active,
                        modifiedBy: user._id,
                        teams: teamsIdArr,
                        score: req.body.score,
                        winner: winnerId._id,
                        updatedAt: Date.now()
                    };
                } catch (error) {
                    res.status(500).json({
                        success: false,
                        msg: 'Unable to connect to db and fetch all users.'
                    });
                }
                try {
                    const updateGame: any = await gameDB.updateGame(game, req);
                    let userWithWinRatio: any = [];
                    let updateUser = [];
                    for (let i: number = 0; i < teamsArr.length; i++) {
                        userWithWinRatio = await this.calculateWinRatio(
                            teamsArr[i].trim(),
                            req,
                            res
                        );
                        updateUser.push(
                            await userDB.updateUserWinRatio(
                                userWithWinRatio,
                                user._id,
                                res
                            )
                        );
                    }
                    if (_.isNil(updateGame.message)) {
                        res.status(200).json({
                            success: true,
                            game: updateGame
                        });
                    } else {
                        res.status(500).json({
                            success: false,
                            msg: updateGame.message
                        });
                    }
                } catch (err) {
                    res.status(500).json({
                        success: false,
                        msg: 'Unable to connect to db and fetch all games.'
                    });
                }
            } else {
                res.status(500).json({
                    success: false,
                    msg: 'Teams are not selected!'
                });
            }
        } else {
            return res
                .status(403)
                .send({ success: false, msg: 'User is not authenticated!' });
        }
    });

    public deleteGame = (passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response) => {
        const token: string = func.getToken(req.headers);
        if (token) {
            try {
                const game:
                    | fromInterfaces.IGame
                    | any = await gameDB.deleteGame(req);
                console.log(`deleteGame`);
                console.log(game);
                if (game !== null) {
                    res.status(200).json({
                        success: true,
                        game
                    });
                } else {
                    res.status(500).json({
                        success: false,
                        msg: game
                    });
                }
            } catch (err) {
                console.error(
                    'Unable to fetch games from the database, Error: ',
                    err
                );
            }
        } else {
            return res
                .status(403)
                .send({ success: false, msg: 'User is not authenticated!' });
        }
    });

    private calculateWinRatio = async (user, req: Request, res: Response) => {
        try {
            let findUserByUsername;
            let userObj;
            findUserByUsername = await userDB.findUserByUsername(user, res);
            userObj = {
                userId: findUserByUsername._id,
                user: findUserByUsername.name,
                games: findUserByUsername.games,
                gamesLen: findUserByUsername.games.length
            };
            let winGames: any = [];
            for (const game of userObj.games) {
                if (!_.isNil(game.winner)) {
                    if (userObj.userId.toString() === game.winner.toString()) {
                        winGames.push({
                            userId: userObj.userId,
                            user: userObj.user,
                            games: game
                        });
                    }
                }
            }
            const result = {
                userId: userObj.userId,
                user: userObj.user,
                winRatio: (winGames.length / userObj.gamesLen) * 100
            };
            return result;
        } catch (err) {
            console.error('Unable to calculate win ratio, Error: ', err);
        }
    };
}
