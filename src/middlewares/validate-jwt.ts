import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { CustomRequest } from '../types/types';

interface PayloadInterface {
    uid: string;
}

export const validateJWT = async( req: Request, res: Response, next: NextFunction ) => {

    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            msg: 'There is no token in the request'
        });
    }

    try {

        const payload = jwt.verify( token, process.env.SECRET_OR_PRIVATE_KEY as string );
        const { uid } = payload as PayloadInterface;

        //Read from the DB the user that matches with the uid
        const user = await User.findById( uid );

        //If user does not exist then return an error message
        if( !user ){
            return res.status(401).json({
                msg: 'Invalid token - the user does not exist in the DB'
            });
        }

        //Check if the user with uid has true in the status (if it's active)
        if( !user.status ){
            return res.status(401).json({
                msg: 'Invalid token - user is inactive'
            });
        }
        
        const newReq = req as CustomRequest;
        newReq.user = user;
        
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Invalid token'
        });
    }


}