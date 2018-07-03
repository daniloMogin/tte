import { Request, Response } from 'express';
import CupModel from '../../models/cup.server.model';
import * as fromInterfaces from './../../models/interfaces/index';

export default class CupDBCalls {
    public findCup(req: Request, res: Response) {
        return new Promise(resolve => {
            try {
                CupModel.find()
                    .populate('createdBy groups', '-password -__v')
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

    public findCupById(req: Request, res: Response) {
        return new Promise(resolve => {
            try {
                CupModel.findById(req.params.id)
                    .populate('createdBy groups', '-password -__v')
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

    public findCupByName(req: Request, res: Response) {
        return new Promise(resolve => {
            try {
                CupModel.find({ name: req.params.name })
                    .populate('createdBy groups', '-password -__v')
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

    public findCupByGroup(req: Request, res: Response) {
        return new Promise(resolve => {
            try {
                CupModel.find({ groups: req.params.group })
                    .populate('createdBy groups', '-password -__v')
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

    public createCup(cup: fromInterfaces.ICup, req: Request, res: Response) {
        return new Promise(resolve => {
            try {
                console.log(`cup+-++*+-*++-*/+-*+/-*+/+*/+-`);
                console.log(cup);
                const result: fromInterfaces.ICup = new CupModel({
                    name: cup.name,
                    description: cup.description,
                    active: cup.active,
                    createdBy: cup.createdBy,
                    modifiedBy: cup.createdBy,
                    groups: cup.groups
                });
                console.log(`result`);
                console.log(result);
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

    public updateCup(cup: fromInterfaces.ICup, req: Request, res: Response) {
        return new Promise(resolve => {
            try {
                const result = {
                    name: cup.name,
                    description: cup.description,
                    active: cup.active,
                    createdBy: cup.createdBy,
                    modifiedBy: cup.modifiedBy,
                    groups: cup.groups
                };

                CupModel.findByIdAndUpdate(req.params.id, result)
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

    public deleteCup(req: Request, res: Response) {
        return new Promise(resolve => {
            try {
                CupModel.findByIdAndRemove(req.params.id)
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
