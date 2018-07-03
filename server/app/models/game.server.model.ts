import * as mongoose from 'mongoose';
import * as fromInterfaces from './interfaces/index';

export const GameSchema: mongoose.Schema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: false
        },
        score: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Result',
            required: true
        }
    },
    { timestamps: true }
);

export default mongoose.model<fromInterfaces.IGame>('Game', GameSchema);
