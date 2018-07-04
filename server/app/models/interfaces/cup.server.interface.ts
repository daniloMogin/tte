import * as mongoose from 'mongoose';
import * as fromInterfaces from './index';

export interface ICup extends mongoose.Document {
    name: string;
    description: string;
    active: boolean;
    groups: fromInterfaces.IGroup[];
    createdAt: Date;
    updatedAt: Date;
    createdBy?: fromInterfaces.IUser;
    modifiedBy?: fromInterfaces.IUser;
}
