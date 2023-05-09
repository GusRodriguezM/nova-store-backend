import { NextFunction, Request, Response } from "express";
import { CustomRequest, Roles } from "../types/types";

//Checks if the user has an ADMIN role
export const isAdminRole = ( req: Request, res: Response, next: NextFunction ) => {

    const { user } = req as CustomRequest;
    
    if( !user ){
        return res.status(500).json({
            msg: 'This action can not be performed because it needs to verify the token first'
        });
    }

    const { role, name } = user;

    if( role !== Roles.ADMIN ){
        return res.status(401).json({
            msg: `The user ${name} does not have enough permissions to perform this action`
        });
    }

    next();
}

//Receives the args (roles) and returns a function to be executed in the DELETE route
//Checks if the role of the authenticated user matches one of the sent roles as an argument
export const hasRole = ( ...roles: string[] ) => {

    return ( req: Request, res: Response, next: NextFunction ) => {

        const { user } = req as CustomRequest;
    
        if( !user ){
            return res.status(500).json({
                msg: 'This action can not be performed because it needs to verify the token first'
            });
        }

        const { role } = user;

        if( !roles.includes( role ) ){
            return res.status(401).json({
                msg: `This service requires one of these roles: ${roles}`
            });
        }

        next();
    }

}