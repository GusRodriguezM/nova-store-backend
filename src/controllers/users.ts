import { Request, Response } from 'express';
import User, { type IUser } from '../models/user';
import bcrypt from 'bcryptjs';


export const getUsers = ( req: Request, res: Response ) => {
    res.json({
        msg: 'getUsers'
    });
}

export const getUser = ( req: Request, res: Response ) => {
    const { id } = req.params;

    res.json({
        msg: 'getUser',
        id
    });
}

export const createUser = async( req: Request, res: Response ) => {
    
    const { name, email, password, role }: IUser = req.body;

    const user = new User({ name, email, password, role });

    //Encrypt the password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync( password, salt );

    //Save it to the DB
    await user.save();

    res.json({ user });
}

export const editUser = ( req: Request, res: Response ) => {
    const { id } = req.params;
    const { body } = req;
    
    res.json({
        msg: 'editUser',
        id,
        body
    });
}

export const deleteUser = ( req: Request, res: Response ) => {
    const { id } = req.params;

    res.json({
        msg: 'deleteUser',
        id
    });
}