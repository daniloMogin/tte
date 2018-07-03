import * as mongoose from 'mongoose';
import * as fromInterfaces from './index';

export interface IGroup extends mongoose.Document {
    name: string;
    description: string;
    active: string;
    teams: fromInterfaces.IUser[];
    createdBy: fromInterfaces.IUser;
    modifiedBy: fromInterfaces.IUser;
    score: fromInterfaces.IGame;
}
