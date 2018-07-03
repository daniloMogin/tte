import { Request, Response, NextFunction } from 'express';

// import RoleModel from '../models/user.server.model';
import RoleModel from '../../models/role.server.model';
// import UserRoleModel from '../models/user-role.server.model';

class RoleDBCalls {
    public findRole = (req: Request, res: Response) => {
        return new Promise(resolve => {
            try {
                RoleModel.find()
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

    public findRoleByName = (name, req: Request, res: Response) => {
        return new Promise(resolve => {
            try {
                RoleModel.findOne({ name })
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

    public findRoleById = (req: Request, res: Response) => {
        return new Promise(resolve => {
            try {
                RoleModel.findOne({ _id: req.params.roleId })
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

    public createRole = (role, req: Request, res: Response) => {
        return new Promise(resolve => {
            try {
                const result = new RoleModel({
                    name: role.name,
                    description: role.description
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

    public updateRole = (role, req: Request, res: Response) => {
        return new Promise(resolve => {
            try {
                const query = { _id: req.params.roleId };
                const result = {
                    name: role.name,
                    description: role.description
                };
                RoleModel.findOneAndUpdate(
                    query,
                    { $set: result },
                    {
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
}

export = RoleDBCalls;
