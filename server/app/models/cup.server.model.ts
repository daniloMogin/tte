import * as mongoose from 'mongoose';
import * as fromInterfaces from './interfaces/index';

export const CupSchema: mongoose.Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        active: {
            type: Boolean,
            required: true
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        modifiedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        groups: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Group',
                required: false
            }
        ]
    },
    { timestamps: true }
);

export default mongoose.model<fromInterfaces.ICup>('Cup', CupSchema);
