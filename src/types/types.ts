import { Request } from 'express';
import { Document, Types } from 'mongoose';
import { IUser } from '../models/user';

export interface CustomRequest extends Request {
    user: Document<unknown, {}, IUser> & Omit<IUser & { _id: Types.ObjectId; }, never>
}

export enum Roles {
    ADMIN = 'ADMIN_ROLE',
    USER = 'USER_ROLE'
}