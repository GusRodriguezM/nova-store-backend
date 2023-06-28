import { Request, Response } from "express";
import { Types } from "mongoose";
import { Category, Product, User } from "../models";

enum Collections {
    CATEGORIES = 'categories',
    PRODUCTS = 'products',
    ROLES = 'roles',
    USERS = 'users',
}

//Main function for all the searches
export const search = ( req: Request, res: Response ) => {

    const { collection, searchTerm } = req.params;

    switch ( collection ) {

        case Collections.CATEGORIES:
            searchCategories( searchTerm, res );
            break;
        
        case Collections.PRODUCTS:
            searchProducts( searchTerm, res );
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

//Function to search in the users collection by name, email or id
const searchUsers = async( searchTerm: string = '', res: Response ) => {

    //Checking if the searchTerm is a valid mongo id
    const { ObjectId } = Types;
    const isMongoId = ObjectId.isValid( searchTerm );

    //If it's a mongo id then search a user by the id
    if( isMongoId ){
        const user = await User.findById( searchTerm );

        //Return an user if exists or else an empty array
        return res.json({
            results: user ? [ user ] : []
        });
    }

    //Regular expression to avoid the case sensitive comparison
    const regexp = new RegExp( searchTerm, 'i' );

    const name = { name: regexp };
    const email = { email: regexp };
    const query = { status: true };

    const [ total, users ] = await Promise.all([
        //Counting the results based on the name or the email and with the status equals true
        User.countDocuments({
            $or: [ name, email ],
            $and: [ query ]
        }),
        //Searching for an user based on the name or the email and with the status equals true
        User.find({
            $or: [ name, email ],
            $and: [ query ]
        })
    ]);

    res.json({ total, results: users });

}

//Function to search in the categories collection by the name
const searchCategories = async( searchTerm: string = '', res: Response ) => {

    const { ObjectId } = Types;
    const isMongoId = ObjectId.isValid( searchTerm );

    if( isMongoId ){
        const category = await Category.findById( searchTerm );
        return res.json({
            results: category ? [ category ] : []
        });
    }
    //Regular expression to avoid the case sensitive comparison
    const regexp = new RegExp( searchTerm, 'i' );

    const data = {
        name: regexp,
        status: true
    }

    const [ total, categories ] = await Promise.all([
        //Counting the results based on the name and the status equals true
        Category.countDocuments( data ),
        Category.find( data )
    ]);

    res.json({ total, results: categories });

}

//Function to search in the products collection by the name and the brand
const searchProducts = async ( searchTerm: string = '', res: Response ) => {
    
    const { ObjectId } = Types;
    const isMongoId = ObjectId.isValid( searchTerm );

    if( isMongoId ){
        const product = await Product.findById( searchTerm ).populate( 'category', 'name' );
        return res.json({
            results: product ? [ product ] : []
        });
    }

    //Regular expression to avoid the case sensitive comparison
    const regexp = new RegExp( searchTerm, 'i' );

    const name = { name: regexp };
    const brand = { brand: regexp };
    const query = { status: true };

    const [ total, products ] = await Promise.all([
        //Counting the results based on the name or brand of the product and with the status equals true
        Product.countDocuments({
            $or: [ name, brand ],
            $and: [ query ]
        }),
        //Searching for a product that matches the name or the brand, with the status equals true and adding its category
        Product.find({
            $or: [ name, brand ],
            $and: [ query ]
        }).populate( 'category', 'name' )
    ]);

    res.json({ total, results: products });

}