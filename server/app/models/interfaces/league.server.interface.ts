import * as mongoose from 'mongoose';
import * as fromInterfaces from './index';

export interface ILeague extends mongoose.Document {
    name: string;
    description: string;
    active: boolean;
    createdBy: fromInterfaces.IUser;
    modifiedBy: fromInterfaces.IUser;
    teams: fromInterfaces.IUser;
}
