import { Request, Response } from 'express';
import GroupModel from '../../models/group.server.model';
import * as fromInterfaces from './../../models/interfaces/index';

export default class GroupDBCalls {
    public findGroup(req: Request, res: Response) {
        return new Promise(resolve => {
            try {
                GroupModel.find()
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

    public findGroupById(req: Request, res: Response) {
        return new Promise(resolve => {
            try {
                GroupModel.findById(req.params.id)
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

    public findGroupByName(name) {
        return new Promise(resolve => {
            try {
                GroupModel.findOne({ name })
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

    public findGroupByGroup(req: Request, res: Response) {
        return new Promise(resolve => {
            try {
                GroupModel.find({ groups: req.params.group })
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

    public createGroup(
        group: fromInterfaces.IGroup,
        req: Request,
        res: Response
    ) {
        return new Promise(resolve => {
            try {
                console.log(`group+-++*+-*++-*/+-*+/-*+/+*/+-`);
                console.log(group);
                const result: fromInterfaces.IGroup = new GroupModel({
                    name: group.name,
                    description: group.description,
                    active: group.active,
                    teams: group.teams,
                    createdBy: group.createdBy,
                    modifiedBy: group.createdBy,
                    score: group.score
                });
                console.log(`result+-++*+-*++-*/+-*+/-*+/+*/+-`);
                console.log(result);
                // result
                //     .save()
                //     .then(data => {
                //         resolve(data);
                //     })
                //     .catch(error => {
                //         resolve(error);
                //     });
            } catch (err) {
                console.error(err);
            }
        });
    }

    public updateGroup(
        group: fromInterfaces.IGroup,
        req: Request,
        res: Response
    ) {
        return new Promise(resolve => {
            try {
                const result = {
                    name: group.name,
                    description: group.description,
                    active: group.active,
                    createdBy: group.createdBy,
                    modifiedBy: group.modifiedBy,
                    score: group.score
                };
                GroupModel.findByIdAndUpdate(req.params.id, result)
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

    public deleteGroup(req: Request, res: Response) {
        return new Promise(resolve => {
            try {
                GroupModel.findByIdAndRemove(req.params.id)
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
