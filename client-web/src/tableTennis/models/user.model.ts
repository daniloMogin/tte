export interface IUser {
    _id?: number;
    id?: number;
    name: string;
    lastname: string;
    username: string;
    password: string;
    email: string;
    active: boolean;
    DoB: string;
    additionalInfo: string;
    role: string;
    winRatio: string;
    games: any;
    createdAt: Date;
    updatedAt: Date;
    createdBy: any;
    modifiedBy: any;
}
