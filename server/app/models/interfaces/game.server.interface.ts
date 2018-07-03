import * as mongoose from 'mongoose';
import * as fromInterfaces from './index';

export interface IGame extends mongoose.Document {
    description: string;
    score: fromInterfaces.IResult;
}
