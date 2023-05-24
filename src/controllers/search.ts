import { Request, Response } from "express";
import { Types } from "mongoose";
import { User } from "../models";

enum Collections {
    CATEGORIES = 'categories',
    PRODUCTS = 'products',
    ROLES = 'roles',
    USERS = 'users',
}

export const search = ( req: Request, res: Response ) => {

    const { collection, searchTerm } = req.params;

    switch ( collection ) {

        case Collections.CATEGORIES:
            break;
        
        case Collections.PRODUCTS:
            break;
        
        case Collections.USERS:
            searchUsers( searchTerm, res );
            break;
    
        default:
            res.status(500).json({
                msg: 'NOT ALLOWED!'
            });
            break;

    }

}

const searchUsers = async( searchTerm: string = '', res: Response ) => {

    const { ObjectId } = Types;
    const isMongoId = ObjectId.isValid( searchTerm );

    if( isMongoId ){
        const user = await User.findById( searchTerm );
        return res.json({
            results: user ? [ user ] : []
        });
    }

    const regexp = new RegExp( searchTerm, 'i' );

    const name = { name: regexp };
    const email = { email: regexp };
    const query = { status: true };

    const [ total, users ] = await Promise.all([
        User.countDocuments({
            $or: [ name, email ],
            $and: [ query ]
        }),
        User.find({
            $or: [ name, email ],
            $and: [ query ]
        })
    ]);

    res.json({ total, results: users });

}