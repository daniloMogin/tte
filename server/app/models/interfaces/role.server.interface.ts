import * as mongoose from 'mongoose';

export interface IRole extends mongoose.Document {
  name: string;
  description: string;
}
