import { Request, Response } from 'express';
import * as passport from 'passport';
import * as _ from 'lodash';
import GroupDBCalls from '../repo/group_repo/group.server.repo';
import GameDBCalls from '../repo/game_repo/game.server.repo';
import UserDBCalls from '../repo/user_repo/user.server.repo';
import * as fromInterfaces from './../models/interfaces/index';
import Functions from '../share/functions.server';

const robin = require('roundrobin');

const groupDB = new GroupDBCalls();
const gameDB = new GameDBCalls();
const userDB = new UserDBCalls();
const func = new Functions();

export default class GroupController {
    public getGroups = (passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response) => {
        try {
            const token: string = func.getToken(req.headers);
            if (token) {
                const group:
                    | fromInterfaces.IGroup[]
                    | any = await groupDB.findGroup();
                if (group.length >= 0) {
                    res.status(200).json({
                        success: true,
                        group
                    });
                } else {
                    res.status(500).json({
                        success: false,
                        msg: group
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
                'Unable to fetch Groups from the database, Error: ',
                err
            );
        }
    });

    public getGroupById = (passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response) => {
        try {
            const token: string = func.getToken(req.headers);
            if (token) {
                const group:
                    | fromInterfaces.IGroup
                    | any = await groupDB.findGroupById(req);
                console.log(`findGroup`);
                console.log(group);
                if (group !== null) {
                    res.status(200).json({
                        success: true,
                        group
                    });
                } else {
                    res.status(500).json({
                        success: false,
                        msg: group
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
                'Unable to fetch Group from the database, Error: ',
                err
            );
        }
    });

    public getGroupsByName = (passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response) => {
        try {
            const token: string = func.getToken(req.headers);
            if (token) {
                const group: any = await groupDB.findGroupByName(req.body.name);
                console.log(`findGroups`);
                console.log(group);
                if (group.length > 0) {
                    res.status(200).json({
                        success: true,
                        group
                    });
                } else {
                    res.status(500).json({
                        success: false,
                        msg: group
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
                'Unable to fetch Group from the database, Error: ',
                err
            );
        }
    });

    public createGroup = (passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response) => {
        const token: string = func.getToken(req.headers);
        if (token) {
            try {
                const user: any = await func.decodeToken(token);
                const findGroupByName: any = await groupDB.findGroupByName(
                    req.body.name
                );
                if (_.isNil(findGroupByName)) {
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
                    }
                    const gamesArr = robin(teamsIdArr.length, teamsArr);
                    const gamesArrId = robin(teamsIdArr.length, teamsIdArr);
                    let gameObj = [];
                    for (let i = 0; i < gamesArr.length; i++) {
                        for (let j = 0; j < gamesArr[i].length; j++) {
                            gameObj.push({
                                name: 'groupGame',
                                description: 'groupGame',
                                active: req.body.active,
                                teamsNames: gamesArr[i][j],
                                teams: gamesArrId[i][j],
                                createdBy: user._id,
                                modifiedBy: user._id,
                                createdAt: Date.now(),
                                updatedAt: Date.now()
                            });
                        }
                    }
                    let genGame = [];
                    for (const game of gameObj) {
                        genGame.push(
                            await this.generateGames(game, user._id, req, res)
                        );
                    }
                    const genGameIds: number[] = [];
                    for (const i of genGame) {
                        genGameIds.push(i._id);
                    }
                    // console.log(`genGame`);
                    // console.log(genGame);

                    const group: any = {
                        name: req.body.name,
                        description: req.body.description,
                        active: req.body.active,
                        teams: teamsIdArr,
                        score: genGameIds,
                        createdBy: user._id,
                        modifiedBy: user._id
                    };
                    const createGroup: any = await groupDB.createGroup(group);
                    if (_.isNil(createGroup.message)) {
                        res.status(200).json({
                            success: true,
                            group: createGroup
                        });
                    } else {
                        res.status(500).json({
                            success: false,
                            msg: createGroup
                        });
                    }
                } else {
                    return res.status(403).send({
                        success: false,
                        msg: 'Group with same name already exists!'
                    });
                }
            } catch (err) {
                console.error(
                    'Unable to connect to db and fetch all groups. Error is ',
                    err
                );
            }
        } else {
            return res
                .status(403)
                .send({ success: false, msg: 'User is not authenticated!' });
        }
    });

    public generateGames = (passport.authenticate('jwt', { session: false }),
    async (game, userId, req: Request, res: Response) => {
        try {
            let teamsObjectArr: fromInterfaces.IUser[] = [];
            let teamsIdArr: number[] = [];
            for (let i: number = 0; i < game.teams.length; i++) {
                const findUserByUsername: any = await userDB.findUserByUsername(
                    game.teamsNames[i].trim(),
                    res
                );
                if (!_.isNil(findUserByUsername)) {
                    teamsIdArr.push(findUserByUsername._id);
                }
                teamsObjectArr.push(findUserByUsername);
            }

            let createGame: any = [];
            const updateUser = [];
            createGame = await gameDB.createGame(game);
            for (const i of teamsObjectArr) {
                updateUser.push(
                    userDB.updateUserGame(
                        i,
                        createGameIdArray(i, createGame),
                        userId,
                        res
                    )
                );
            }
            return createGame;
        } catch (err) {
            console.error(
                'Unable to connect to db and fetch all groups. Error is ',
                err
            );
        }
    });

    public updateGroup = (passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response) => {
        const token: string = func.getToken(req.headers);
        if (token) {
            const user: any = await func.decodeToken(token);

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
            }

            const group: fromInterfaces.IGroup | any = {
                name: req.body.name,
                description: req.body.description,
                active: req.body.active,
                modifiedBy: user._id,
                teams: teamsIdArr,
                score: req.body.score
            };
            try {
                const updateGroup: any = await groupDB.updateGroup(group, req);
                if (_.isNil(updateGroup.message)) {
                    res.status(200).json({
                        success: true,
                        group: updateGroup
                    });
                } else {
                    res.status(500).json({
                        success: false,
                        msg: updateGroup
                    });
                }
            } catch (err) {
                console.error(
                    'Unable to connect to db and fetch all groups. Error is ',
                    err
                );
            }
        } else {
            return res
                .status(403)
                .send({ success: false, msg: 'User is not authenticated!' });
        }
    });

    public deleteGroup = (passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response) => {
        const token: string = func.getToken(req.headers);
        if (token) {
            try {
                const group:
                    | fromInterfaces.IGroup
                    | any = await groupDB.deleteGroup(req);
                console.log(`deleteGroup`);
                console.log(group);
                if (group !== null) {
                    res.status(200).json({
                        success: true,
                        group
                    });
                } else {
                    res.status(500).json({
                        success: false,
                        msg: group
                    });
                }
            } catch (err) {
                console.error(
                    'Unable to fetch groups from the database, Error: ',
                    err
                );
            }
        } else {
            return res
                .status(403)
                .send({ success: false, msg: 'User is not authenticated!' });
        }
    });
}

const createGameIdArray = (
    input: fromInterfaces.IUser,
    createGame: fromInterfaces.IGame
): number[] => {
    const gameIds: number[] = [createGame._id];
    if (!_.isNil(input.games)) {
        for (const game of input.games) {
            if (!_.isNil(game._id)) {
                if (createGame._id !== game._id) {
                    gameIds.push(game._id);
                }
            }
        }
    }
    return gameIds;
};
