import { Request, Response } from 'express';
import { User } from '../models';
import bcrypt from 'bcryptjs';

type ReqBody = {
    _id: string;
    name: string;
    email: string;
    image: string;
    password: string;
    role: string;
    status: boolean;
    googleAuth: boolean;
}

//Get users controller
export const getUsers = async( req: Request, res: Response ) => {
    const { limit = 5, from = 0 } = req.query;
    const query = { status: true };

    const [ total , users ] = await Promise.all([
        User.countDocuments( query ),
        User.find( query )
            .skip( Number(from) )
            .limit( Number(limit) )
    ]);

    res.json({ total, users });
}

//Get user controller
export const getUser = async( req: Request, res: Response ) => {
    const { id } = req.params;
    const query = { status: true };

    const user = await User.findById( id ).where( query );

    res.json( user );
}

//Create user controller
export const createUser = async( req: Request, res: Response ) => {
    
    const { name, email, password }: ReqBody = req.body;

    const user = new User({ name, email, password });

    //Encrypt the password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync( password, salt );

    //Save it to the DB
    await user.save();

    res.json( user );
}

//Edit user controller
export const editUser = async( req: Request, res: Response ) => {
    const { id } = req.params;
    const { _id, googleAuth, email, ...rest }: ReqBody = req.body;
    const { password } = rest;

    if( password ){
        //Encrypt the password
        const salt = bcrypt.genSaltSync();
        rest.password = bcrypt.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate( id, rest );
    
    res.json( user );
}

//Delete user controller
export const deleteUser = async( req: Request, res: Response ) => {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate( id, { status: false } );

    res.json( user );
}