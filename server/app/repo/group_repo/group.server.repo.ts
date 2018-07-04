import { Request } from 'express';
import GroupModel from '../../models/group.server.model';
import * as fromInterfaces from './../../models/interfaces/index';

export default class GroupDBCalls {
    /**
     * 
                        'teams createdBy modifiedBy score',
                        '-password -__v'
     */
    public findGroup() {
        return new Promise(resolve => {
            try {
                GroupModel.find()
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

    public findGroupById(req: Request) {
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

    /**
     * 
     * @param name 
                        'teams createdBy modifiedBy score',
                        '-password -__v'
     */
    public findGroupByName(name) {
        return new Promise(resolve => {
            try {
                GroupModel.findOne({ name })
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

    public createGroup(group: fromInterfaces.IGroup) {
        return new Promise(resolve => {
            try {
                const result: fromInterfaces.IGroup = new GroupModel({
                    name: group.name,
                    description: group.description,
                    active: group.active,
                    teams: group.teams,
                    createdBy: group.createdBy,
                    modifiedBy: group.createdBy,
                    score: group.score
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

    public updateGroup(group: fromInterfaces.IGroup, req: Request) {
        return new Promise(resolve => {
            try {
                const result = {
                    name: group.name,
                    description: group.description,
                    active: group.active,
                    createdBy: group.createdBy,
                    modifiedBy: group.modifiedBy,
                    teams: group.teams,
                    score: group.score
                };
                console.log(`result`);
                console.log(result);
                return;
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

    public deleteGroup(req: Request) {
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
