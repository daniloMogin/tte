import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jwt-simple';
import * as _ from 'lodash';

const config = require('./../../config/constants/constants');
import UserModel from '../../models/user.server.model';
const Functions = require('../../share/functions.server');
const func = new Functions();

const salt = bcrypt.genSaltSync(10);

class UserDBCalls {
    public findUser = (req: Request, res: Response) => {
        return new Promise(resolve => {
            try {
                UserModel.find()
                    .populate('company role job.jobId', '-__v')
                    .select('-job._id')
                    .exec((err, user) => {
                        if (err) throw err;
                        resolve(user);
                    });
            } catch (error) {
                res.status(500).json({ error });
            }
        });
    };

    public findUserById = (req: Request, res: Response) => {
        return new Promise(resolve => {
            try {
                UserModel.findById(req.params.userId, '-password -__v')
                    .populate('company role job.jobId', '-__v')
                    .select('-job._id')
                    .exec((err, user) => {
                        if (err) throw err;
                        resolve(user);
                    });
            } catch (error) {
                res.status(500).json({ error });
            }
        });
    };

    public findUserByUsername = (username: string, res: Response) => {
        return new Promise(resolve => {
            try {
                UserModel.findOne({ username: username })
                    .populate('company role job.jobId', '-__v')
                    .select('-job._id')
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        resolve(error);
                    });
            } catch (error) {
                res.status(500).json({ error });
            }
        });
    };

    public findUsersByRoleName(req: Request, res: Response) {
        return new Promise((resolve, reject) => {
            try {
                UserModel.find()
                    .populate('company role job.jobId', '-__v')
                    .select('-job._id')
                    .then((users: any[]) => {
                        let data: any[] = [];
                        for (let i: number = 0; i < users.length; i++) {
                            for (
                                let j: number = 0;
                                j < users[i].role.length;
                                j++
                            ) {
                                if (users[i].role[j].name === req.params.role) {
                                    data.push(users[i]);
                                }
                            }
                        }
                        if (data.length > 0) {
                            resolve(data);
                        } else {
                            reject(data);
                        }
                    });
                // .exec(users => {
                //     console.log(users);
                //     var data: any = [];
                //     for (let i in users) {
                //         if (users[i].role.includes(req.params.role)) {
                //             data.push(users[i]);
                //         }
                //     }
                //     if (data.length > 0) {
                //         resolve(data);
                //     } else {
                //         reject(data);
                //     }
                // });
            } catch (error) {
                res.status(500).json({ error });
            }
        });
    }

    public createUser = (user, req: Request, res: Response) => {
        return new Promise(resolve => {
            try {
                const passHash: string = bcrypt.hashSync(user.password);
                const result = new UserModel({
                    name: user.name,
                    lastname: user.lastname,
                    username: user.username,
                    password: passHash,
                    email: user.email,
                    active: user.active,
                    DoB: user.DoB,
                    additionalInfo: user.additionalInfo,
                    role: user.role
                });
                result
                    .save()
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        resolve(error);
                    });
            } catch (error) {
                res.status(500).json({ error });
            }
        });
    };

    public updateUser = (user, req: Request, res: Response) => {
        return new Promise(resolve => {
            try {
                const passHash: string = bcrypt.hashSync(user.password);
                const result = {
                    name: user.name,
                    lastname: user.lastname,
                    username: user.username,
                    password: passHash,
                    email: user.email,
                    status: user.status,
                    city: user.city,
                    country: user.country,
                    locationChange: user.locationChange,
                    jobType: user.jobType,
                    experience: user.experience,
                    gender: user.gender,
                    DoB: user.DoB,
                    additionalInfo: user.additionalInfo,
                    role: user.role
                };
                UserModel.findByIdAndUpdate(
                    req.params.userId,
                    { $set: result },
                    {
                        select: '-password',
                        upsert: false,
                        new: true
                    },
                    (err, doc) => {
                        if (err) throw err;
                        resolve(doc);
                    }
                );
            } catch (error) {
                res.status(500).json({ error });
            }
        });
    };

    private authenticateUserPassword = (
        authenticate_user_email,
        req_password: string,
        res: Response
    ) => {
        const user_pass: string = authenticate_user_email.password;
        return new Promise(resolve => {
            try {
                func.authenticatePassword(
                    req_password,
                    user_pass,
                    (err: Error, isMatch: string | number) => {
                        console.log(isMatch);
                        console.log(err);
                        if (isMatch && !err) {
                            const token = jwt.encode(
                                authenticate_user_email,
                                config.secret
                            );
                            const result = {
                                success: true,
                                id: authenticate_user_email._id,
                                name: authenticate_user_email.name,
                                lastName: authenticate_user_email.lastname,
                                username: authenticate_user_email.username,
                                email: authenticate_user_email.email,
                                status: authenticate_user_email.status,
                                city: authenticate_user_email.city,
                                country: authenticate_user_email.country,
                                locationChange:
                                    authenticate_user_email.locationChange,
                                jobType: authenticate_user_email.jobType,
                                experience: authenticate_user_email.experience,
                                gender: authenticate_user_email.gender,
                                DoB: authenticate_user_email.DoB,
                                additionalInfo:
                                    authenticate_user_email.additionalInfo,
                                token: 'JWT ' + token
                            };
                            // resolve(result);
                            UserModel.findById(result.id, '-password -__v')
                                .populate('company role job.jobId', '-__v')
                                .select('-job._id')
                                .then((user: any) => {
                                    const userNToken = {
                                        status: user.status,
                                        locationChange: user.locationChange,
                                        jobType: user.jobType,
                                        role: user.role,
                                        job: user.job,
                                        _id: user._id,
                                        name: user.name,
                                        lastname: user.lastname,
                                        email: user.email,
                                        city: user.city,
                                        country: user.country,
                                        experience: user.experience,
                                        gender: user.gender,
                                        DoB: user.DoB,
                                        additionalInfo: user.additionalInfo,
                                        company: user.company,
                                        createdAt: user.createdAt,
                                        updatedAt: user.updatedAt,
                                        token: 'JWT ' + token
                                    };
                                    resolve(userNToken);
                                })
                                .catch(error => {
                                    resolve(error);
                                });
                            return;
                        } else {
                            res.status(400).send({
                                message:
                                    "User with that credentials don't exist!"
                            });
                        }
                    }
                );
            } catch (err) {
                return res.status(400).send({
                    message: func.getErrorMessage(err)
                });
            }
        });
    };
}

export = UserDBCalls;
