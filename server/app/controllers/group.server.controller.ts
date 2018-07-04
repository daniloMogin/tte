import { Request, Response } from 'express';
import * as passport from 'passport';
import * as _ from 'lodash';
import GroupDBCalls from '../repo/group_repo/group.server.repo';
import UserDBCalls from '../repo/user_repo/user.server.repo';
import * as fromInterfaces from './../models/interfaces/index';
import Functions from '../share/functions.server';

const groupDB = new GroupDBCalls();
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
                    // TODO PRAVLJENJE GRUPA
                    const teamsIdArrPairs = _(teamsIdArr).reduce(function(
                        result,
                        value,
                        index
                    ) {
                        if (index % 2 === 0)
                            result.push(teamsIdArr.slice(index, index + 2));

                        return result;
                    },
                    []);
                    const user: any = await func.decodeToken(token);
                    const group: any = {
                        name: req.body.name,
                        description: req.body.description,
                        active: req.body.active,
                        teams: teamsIdArr,
                        createdBy: user._id,
                        modifiedBy: user._id
                    };
                    const createGroup: any = await groupDB.createGroup(group);
                    if (_.isNil(createGroup.errors)) {
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

    public updateGroup = (passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response) => {
        const token: string = func.getToken(req.headers);
        if (token) {
            const user: any = await func.decodeToken(token);
            const group: fromInterfaces.IGroup | any = {
                name: req.body.name,
                description: req.body.description,
                active: req.body.active,
                modifiedBy: user._id,
                teams: req.body.teams,
                score: req.body.score
            };
            console.log(`group`);
            console.log(group);
            try {
                const updateGroup: any = await groupDB.updateGroup(group, req);
                console.log(`updateGroup`);
                console.log(updateGroup);
                if (_.isNil(updateGroup)) {
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
