import * as mongoose from 'mongoose';
import * as fromInterfaces from './interfaces/index';

export const RoleSchema: mongoose.Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        }
    },
    { timestamps: true }
);

export default mongoose.model<fromInterfaces.IRole>('Role', RoleSchema);
