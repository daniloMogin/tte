import * as mongoose from 'mongoose';
import * as fromInterfaces from './interfaces/index';

export const ResultSchema: mongoose.Schema = new mongoose.Schema(
    {
        score: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        teams: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            }
        ]
    },
    { timestamps: true }
);

export default mongoose.model<fromInterfaces.IResult>('Result', ResultSchema);
