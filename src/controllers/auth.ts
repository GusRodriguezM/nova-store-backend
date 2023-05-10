import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';

import User from "../models/user";
import { generateJWT, googleVerify } from "../helpers";

type ReqBody = {
    email: string;
    password: string;
}

type Token = {
    id_token: string;
}

//Login API controller
export const login = async( req: Request, res: Response ) => {

    const { email, password }: ReqBody = req.body;

    try {

        //Check if the email exist
        const user = await User.findOne({ email });

        if( !user ){
            return res.status(400).json({
                msg: 'Email / password are incorrect'
            });
        }

        //Check if the user is active
        if( !user.status ){
            return res.status(400).json({
                msg: 'Email / Password are incorrect'
            });
        }

        //Check the password
        const validPassword = bcryptjs.compareSync( password, user.password );
        if( !validPassword ){
            return res.status(400).json({
                msg: 'Email / Password are incorrect'
            });
        }

        //Validate the JWT
        const token = await generateJWT( user.id );

        //Sending the user and the token in the response
        res.json({ user, token });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Something went wrong!' });
    }

}

export const googleSignIn = async( req: Request, res: Response ) => {
    const { id_token }: Token = req.body;

    try {
        
        const googleUser = await googleVerify( id_token );
        console.log(googleUser);
        
        res.json({
            msg: 'Token received: ok!',
            id_token
        });

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'The token could not be verified'
        });
    }


}