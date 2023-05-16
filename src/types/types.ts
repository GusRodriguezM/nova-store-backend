import { Request } from 'express';
import { Document, Types } from 'mongoose';
import { InterfaceUser } from '../models/user';

export interface CustomRequest extends Request {
    user: Document<unknown, {}, InterfaceUser> & Omit<InterfaceUser & { _id: Types.ObjectId; }, never>
}

export enum Roles {
    ADMIN = 'ADMIN_ROLE',
    USER = 'USER_ROLE'
}