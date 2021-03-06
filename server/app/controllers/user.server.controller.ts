import { Request, Response, NextFunction } from 'express';
import * as passport from 'passport';
import * as _ from 'lodash';

const config = require('./../config/constants/constants');

import UserModel from '../models/user.server.model';
import { IUser } from './../models/interfaces/user.server.interface';
import { decode } from '../../node_modules/@types/jwt-simple/index';

const UserDBCalls = require('../repo/user_repo/user.server.repo');
const RoleDBCalls = require('../repo/role_repo/role.server.repo');
const Functions = require('../share/functions.server');

const user_db = new UserDBCalls();
const role_db = new RoleDBCalls();
const func = new Functions();

class UserController {
    public renderRegister = (req: Request, res: Response) => {
        console.log('=================================================');
        console.log('Rendering register... (register.server.controller.ts 34)');
        console.log('=================================================');
        res.render('register', {
            title: 'Be SMART DOIT'
        });
    };

    public renderUsers = (passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response) => {
        console.log('=================================================');
        console.log('Rendering user... (user.server.controller.ts 34)');
        console.log('=================================================');
        const findUser = await user_db.findUser();
        if (findUser.length > 0) {
            res.render('listUsers', {
                title: 'Be SMART DOIT',
                user: findUser
            });
        } else {
            res.status(500).json({ success: false, msg: findUser });
        }
    });

    public getUsers = (passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response) => {
        const token: string = func.getToken(req.headers);
        if (token) {
            const tempUser: string = func.decodeToken(token);
            try {
                const findUser = await user_db.findUser();
                if (findUser.length > 0) {
                    res.status(200).json({ success: true, user: findUser });
                } else {
                    res.status(500).json({ success: false, msg: findUser });
                }
            } catch (error) {
                res.status(500).json({
                    success: false,
                    msg: 'Get all users error ' + error
                });
            }
        } else {
            return res
                .status(403)
                .send({ success: false, msg: 'User is not authenticated!' });
        }
    });

    public getUserById = (passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response) => {
        const token: string = func.getToken(req.headers);
        if (token) {
            try {
                const findUserById = await user_db.findUserById(req);
                if (findUserById != null) {
                    res.status(200).json({ success: true, user: findUserById });
                } else {
                    res.status(500).json({ success: false, msg: findUserById });
                }
            } catch (error) {
                res.status(500).json({
                    success: false,
                    msg: error
                });
            }
        } else {
            return res
                .status(403)
                .send({ success: false, msg: 'User is not authenticated!' });
        }
    });

    public getUserByUsername = (passport.authenticate('jwt', {
        session: false
    }),
    async (username: string, req: Request, res: Response) => {
        const token: string = func.getToken(req.headers);
        if (token) {
            try {
                const findUserByUsername = await user_db.findUserByUsername(
                    username,
                    res
                );
                if (findUserByUsername != null) {
                    res.status(200).json({
                        success: true,
                        user: findUserByUsername
                    });
                } else {
                    res.status(500).json({
                        success: false,
                        msg: findUserByUsername
                    });
                }
            } catch (error) {
                res.status(500).json({
                    success: false,
                    msg: error
                });
            }
        } else {
            return res
                .status(403)
                .send({ success: false, msg: 'User is not authenticated!' });
        }
    });

    public getUserByCompany = (passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response) => {
        const token: string = func.getToken(req.headers);
        if (token) {
            try {
                const findUsers = await user_db
                    .findUsersByCompanyName(req, res)
                    .then(data => {
                        res.status(200).json({ success: true, user: data });
                    })
                    .catch(error => {
                        res.status(500).json({ success: false, msg: error });
                    });
            } catch (error) {
                res.status(500).json({
                    success: false,
                    msg: error
                });
            }
        } else {
            return res
                .status(403)
                .send({ success: false, msg: 'User is not authenticated!' });
        }
    });

    public getUserByRole = (passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response) => {
        const token: string = func.getToken(req.headers);
        if (token) {
            try {
                const findUsers = await user_db
                    .findUsersByRoleName(req, res)
                    .then(data => {
                        res.status(200).json({ success: true, user: data });
                    })
                    .catch(error => {
                        res.status(500).json({ success: false, msg: error });
                    });
            } catch (error) {
                res.status(500).json({
                    success: false,
                    msg: error
                });
            }
        } else {
            return res
                .status(403)
                .send({ success: false, msg: 'User is not authenticated!' });
        }
    });

    public createUser = (passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response) => {
        const token: string = func.getToken(req.headers);
        if (token) {
            const findUserByUsername = await user_db.findUserByUsername(
                req.body.username,
                res
            );
            if (findUserByUsername != null) {
                res.status(403).json({
                    success: false,
                    msg: 'User with that username already exists'
                });
            } else {
                const roleArr: string[] = req.body.role.split(',');
                let roleIdArr: number[] = [];
                for (let i: number = 0; i < roleArr.length; i++) {
                    const findRoleByName = await role_db.findRoleByName(
                        roleArr[i].trim()
                    );
                    roleIdArr.push(findRoleByName._id);
                }
                const name: string = req.body.name;
                const lastname: string = req.body.lastname;
                const username: string = req.body.username;
                const password: string = req.body.password;
                const email: string = req.body.email;
                const active: string = req.body.active;
                const DoB: string = req.body.DoB;
                const additionalInfo: string = req.body.username;
                const user = [
                    {
                        name,
                        lastname,
                        username,
                        password,
                        email,
                        active,
                        DoB,
                        additionalInfo,
                        roleIdArr
                    }
                ];
                const validate_register = await func.validateRegister(
                    ...user,
                    res
                );
                if (_.isNil(validate_register.error)) {
                    const createUser = await user_db.createUser(
                        validate_register
                    );
                    if (_.isNil(createUser.errmsg)) {
                        res.status(200).json({
                            success: true,
                            user: createUser
                        });
                    } else {
                        res.status(500).json({
                            success: false,
                            msg: createUser
                        });
                    }
                } else {
                    res.status(500).json({
                        success: false,
                        msg: validate_register
                    });
                }
            }
        } else {
            return res
                .status(403)
                .send({ success: false, msg: 'User is not authenticated!' });
        }
    });

    public updateUser = (passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response) => {
        const token: string = func.getToken(req.headers);
        if (token) {
            const roleArr: string[] = req.body.role.split(',');
            let roleIdArr: number[] = [];
            for (let i: number = 0; i < roleArr.length; i++) {
                const findRoleByName = await role_db.findRoleByName(
                    roleArr[i].trim()
                );
                if (!_.isNil(findRoleByName)) {
                    roleIdArr.push(findRoleByName._id);
                }
            }
            const name: string = req.body.name;
            const lastname: string = req.body.lastname;
            const username: string = req.body.username;
            const password: string = req.body.password;
            const email: string = req.body.email;
            const status: string = req.body.status;
            const city: string = req.body.city;
            const country: string = req.body.country;
            const locationChange: string = req.body.locationChange;
            const jobType: string = req.body.jobType;
            const experience: string = req.body.experience;
            const gender: string = req.body.gender;
            const DoB: string = req.body.DoB;
            const additionalInfo: string = req.body.additionalInfo;

            const user = [
                {
                    name,
                    lastname,
                    username,
                    password,
                    email,
                    status,
                    city,
                    country,
                    locationChange,
                    jobType,
                    experience,
                    gender,
                    DoB,
                    additionalInfo,
                    role: roleIdArr
                }
            ];

            try {
                const findUserById = await user_db.findUserById(req);
                if (findUserById != null) {
                    const updateUser = await user_db.updateUser(...user, req);
                    res.status(201).json({ success: true, user: updateUser });
                } else {
                    res.status(500).json({ success: false, msg: findUserById });
                }
            } catch (error) {
                res.status(500).json({
                    success: false,
                    msg: 'Update user error ' + error
                });
            }
        } else {
            return res
                .status(403)
                .send({ success: false, msg: 'User is not authenticated!' });
        }
    });

    public async authenticate(req: Request, res: Response) {
        try {
            const validate_login = await func.validateLogin(
                req.body.username,
                req.body.password,
                res
            );

            if (_.isNil(validate_login.error)) {
                const authenticate_user_email = await user_db.findUserByUsername(
                    validate_login.username
                );
                if (!_.isNil(authenticate_user_email)) {
                    const authenticate_user_password = await user_db.authenticateUserPassword(
                        authenticate_user_email,
                        req.body.password,
                        res
                    );
                    res.status(201).json({
                        success: true,
                        msg: authenticate_user_password
                    });
                } else {
                    res.status(500).json({
                        success: false,
                        msg: authenticate_user_email
                    });
                }
            } else {
                res.status(500).json({ success: false, msg: validate_login });
            }
        } catch (error) {
            console.log('User error ', error);
        }
    }

    public async register(req: Request, res: Response) {
        try {
            const findUserByUsername = await user_db.findUserByUsername(
                req.body.username,
                res
            );
            if (findUserByUsername != null) {
                res.status(403).json({
                    success: false,
                    msg: 'User with that username already exists'
                });
            } else {
                const roleArr: string[] = req.body.role.split(',');
                let roleIdArr: number[] = [];
                for (let i: number = 0; i < roleArr.length; i++) {
                    const findRoleByName = await role_db.findRoleByName(
                        roleArr[i].trim()
                    );
                    roleIdArr.push(findRoleByName._id);
                }
                const name: string = req.body.name;
                const lastname: string = req.body.lastname;
                const username: string = req.body.username;
                const password: string = req.body.password;
                const email: string = req.body.email;
                const active: string = req.body.active;
                const DoB: string = req.body.DoB;
                const additionalInfo: string = req.body.username;
                const user = [
                    {
                        name,
                        lastname,
                        username,
                        password,
                        email,
                        active,
                        DoB,
                        additionalInfo,
                        roleIdArr
                    }
                ];
                const validate_register = await func.validateRegister(
                    ...user,
                    res
                );
                if (_.isNil(validate_register.error)) {
                    const createUser = await user_db.createUser(
                        validate_register
                    );
                    if (!_.isNil(createUser.errmsg)) {
                        res.status(200).json({
                            success: true,
                            user: createUser
                        });
                    } else {
                        res.status(500).json({
                            success: false,
                            msg: createUser
                        });
                    }
                } else {
                    res.status(500).json({
                        success: false,
                        msg: validate_register
                    });
                }
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                msg: 'Register user error ' + error
            });
        }
    }

    public getLoggedInUser = (passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response) => {
        const token: string = func.getToken(req.headers);
        if (token) {
            try {
                const decodedUser = await func.decodeToken(token);
                const userId = decodedUser._id;
                UserModel.findById(userId, '-password -__v')
                    .populate('company role job.jobId', '-__v')
                    .select('-job._id')
                    .exec((err, user) => {
                        if (err) throw err;
                        return res
                            .status(200)
                            .json({ success: true, user: user });
                    });
                // const user = {
                //     status: decodedUser.status,
                //     locationChange: decodedUser.locationChange,
                //     jobType: decodedUser.jobType,
                //     role: decodedUser.role,
                //     job: decodedUser.job,
                //     _id: decodedUser._id,
                //     name: decodedUser.name,
                //     lastname: decodedUser.lastname,
                //     email: decodedUser.email,
                //     city: decodedUser.city,
                //     country: decodedUser.country,
                //     experience: decodedUser.experience,
                //     gender: decodedUser.gender,
                //     DoB: decodedUser.DoB,
                //     additionalInfo: decodedUser.additionalInfo,
                //     createdAt: decodedUser.createdAt,
                //     updatedAt: decodedUser.updatedAt
                // }
                // console.log('===================');
                // console.log('Current User : user.server.controller : 409');
                // console.log('===================');
                // console.log(decodedUser);
                // return res
                //     .status(200)
                //     .json({ success: true, user: user })
            } catch (err) {
                console.error(err);
            }
        } else {
            return res
                .status(403)
                .send({ success: false, msg: 'User is not authenticated!' });
        }
    });
}
export = UserController;
