import * as mongoose from 'mongoose';
import * as fromInterfaces from './interfaces/index';

export const LeagueSchema: mongoose.Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
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
        teams: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            }
        ],
        score: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Game',
                required: false
            }
        ]
    },
    { timestamps: true }
);

export default mongoose.model<fromInterfaces.ILeague>('League', LeagueSchema);
