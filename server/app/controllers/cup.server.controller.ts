import { Request, Response } from 'express';
import * as passport from 'passport';
import * as _ from 'lodash';
import CupDBCalls from '../repo/cup_repo/cup.server.repo';
import GroupDBCalls from '../repo/group_repo/group.server.repo';
import * as fromInterfaces from './../models/interfaces/index';
import Functions from '../share/functions.server';

const cupDB = new CupDBCalls();
const groupDB = new GroupDBCalls();
const func = new Functions();

export default class CupController {
    public getCups = (passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response) => {
        try {
            const token: string = func.getToken(req.headers);
            if (token) {
                const cup: fromInterfaces.ICup[] | any = await cupDB.findCup(
                    req,
                    res
                );
                if (cup.length >= 0) {
                    res.status(200).json({
                        success: true,
                        cup
                    });
                } else {
                    res.status(500).json({
                        success: false,
                        msg: cup
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
                'Unable to fetch Cups from the database, Error: ',
                err
            );
        }
    });

    public getCupById = (passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response) => {
        try {
            const token: string = func.getToken(req.headers);
            if (token) {
                const cup: fromInterfaces.ICup | any = await cupDB.findCupById(
                    req,
                    res
                );
                console.log(`findCup`);
                console.log(cup);
                if (cup !== null) {
                    res.status(200).json({
                        success: true,
                        cup
                    });
                } else {
                    res.status(500).json({
                        success: false,
                        msg: cup
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
                'Unable to fetch Cup from the database, Error: ',
                err
            );
        }
    });

    public getCupsByName = (passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response) => {
        try {
            const token: string = func.getToken(req.headers);
            if (token) {
                const cup: any = await cupDB.findCupByName(req, res);
                console.log(`findCups`);
                console.log(cup);
                if (cup.length > 0) {
                    res.status(200).json({
                        success: true,
                        cup
                    });
                } else {
                    res.status(500).json({
                        success: false,
                        msg: cup
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
                'Unable to fetch Cup from the database, Error: ',
                err
            );
        }
    });

    // TODO naci grupe i ubaciti ih preko id-a, ili imena
    public createCup = (passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response) => {
        const token: string = func.getToken(req.headers);
        if (token) {
            const groupArr: string[] = req.body.groups.split(',');
            console.log(`groupArr`);
            console.log(groupArr);
            let groupIdArr: number[] = [];
            // for (let i: number = 0; i < groupArr.length; i++) {
            //     const findGroupByName = await groupDB.findGroupByName(
            //         groupArr[i].trim()
            //     );
            //     // if (!_.isNil(findGroupByName)) {
            //     //     groupIdArr.push(findGroupByName._id);
            //     // }
            // }
            console.log(`req.body`);
            console.log(req.body);
            const user: any = await func.decodeToken(token);
            const cup: any = {
                name: req.body.name,
                description: req.body.description,
                active: req.body.active,
                createdBy: user._id,
                modifiedBy: user._id,
                groups: groupIdArr
            };
            try {
                const createCup: any = await cupDB.createCup(cup, req, res);
                console.log(`createCup`);
                console.log(createCup);
                if (!_.isNil(createCup.errors)) {
                    res.status(200).json({
                        success: true,
                        cup: createCup
                    });
                } else {
                    res.status(500).json({ success: false, msg: createCup });
                }
            } catch (err) {
                console.error(
                    'Unable to connect to db and fetch all cups. Error is ',
                    err
                );
            }
        } else {
            return res
                .status(403)
                .send({ success: false, msg: 'User is not authenticated!' });
        }
    });

    public updateCup = (passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response) => {
        const token: string = func.getToken(req.headers);
        if (token) {
            const user: any = await func.decodeToken(token);
            const cup: fromInterfaces.ICup | any = {
                name: req.body.name,
                description: req.body.description,
                active: req.body.active,
                modifiedBy: user._id,
                groups: req.body.groups
            };
            try {
                const updateCup: any = await cupDB.updateCup(cup, req, res);
                console.log(`updateCup`);
                console.log(updateCup);
                if (updateCup !== null) {
                    res.status(200).json({
                        success: true,
                        cup: updateCup
                    });
                } else {
                    res.status(500).json({
                        success: false,
                        msg: updateCup
                    });
                }
            } catch (err) {
                console.error(
                    'Unable to connect to db and fetch all cups. Error is ',
                    err
                );
            }
        } else {
            return res
                .status(403)
                .send({ success: false, msg: 'User is not authenticated!' });
        }
    });

    public deleteCup = (passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response) => {
        const token: string = func.getToken(req.headers);
        if (token) {
            try {
                const cup: fromInterfaces.ICup | any = await cupDB.deleteCup(
                    req,
                    res
                );
                console.log(`deleteCup`);
                console.log(cup);
                if (cup !== null) {
                    res.status(200).json({
                        success: true,
                        cup
                    });
                } else {
                    res.status(500).json({
                        success: false,
                        msg: cup
                    });
                }
            } catch (err) {
                console.error(
                    'Unable to fetch cups from the database, Error: ',
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
