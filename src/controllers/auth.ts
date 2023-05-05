import { Request, Response } from "express";
import User from "../models/user";

import bcryptjs from 'bcryptjs';
import { generateJWT } from "../helpers/generate-jwt";

type ReqBody = {
    email: string;
    password: string;
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