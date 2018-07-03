import * as mongoose from 'mongoose';
import * as fromInterface from './index';

export interface IUser extends mongoose.Document {
    name: string;
    lastname: string;
    username: string;
    password: string;
    email: string;
    active: boolean;
    DoB: string;
    additionalInfo: string;
    role: fromInterface.IRole[];
}
