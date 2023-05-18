import { Request, Response } from "express";
import { Category } from "../models";
import { CustomRequest } from "../types/types";

interface CategoryReqBody {
    name: string;
    status: boolean;
    user: UserReqBody;
    [key: string]: any; //This will help to add a new property to the object with any type
}

type UserReqBody = {
    _id: string;
    name: string;
    email: string;
    image: string;
    password: string;
    role: string;
    status: boolean;
    googleAuth: boolean;
}

//Get all the categories
export const getCategories = async( req: Request, res: Response ) => {

    const { limit = 5, from  = 0 } = req.query;
    const query = { status: true };

    /**
     * Waits for the promises to be resolved and gets the total number of documents
     * Gets all the documents that has the status equals true
     */
    const [ total, categories ] = await Promise.all([
        Category.countDocuments( query ),
        Category.find( query )
            //populate returns the object referenced by its id
            .populate( 'user', 'name' )
            .skip( Number(from) )
            .limit( Number(limit) )
    ]);

    res.json({ total, categories });
}

//Get category by id
export const getCategoryById = ( req: Request, res: Response ) => {
    res.json({
        msg: 'Todo ok!'
    });
}

//Create a new category
export const createCategory = async( req: Request, res: Response ) => {

    const name: string = req.body.name.toUpperCase();

    //Searchs for a category and subcategory
    const categoryDB = await Category.findOne({ name });

    //Searches in the database for any other category with the same name
    if( categoryDB ){
        return res.status(400).json({
            msg: `The category ${name} already exists`
        });
    }

    //Getting the type user from the custom request
    const { user } = req as CustomRequest;

    //Prepare the data to save in the DB
    const data = {
        name,
        user: user._id
    }

    //Saving the data into the DB
    const category = new Category( data );

    await category.save();

    res.status(201).json( category );
}

//Update a category by id
export const updateCategory = async( req: Request, res: Response ) => {

    const { id } = req.params;
    const { status, user, ...data }: CategoryReqBody = req.body;

    //Getting the type user from the custom request
    const { user: userCustom } = req as CustomRequest;


    data.name = data.name.toUpperCase();
    //Adding the user id to the data
    data.user = userCustom._id;

    //Updating the category by sending the name and the user id, it returns the object updated
    const category = await Category.findByIdAndUpdate( id, data, { new: true } );

    res.json( category );
}

//Delete category by id
export const deleteCategory = async( req: Request, res: Response ) => {

    const { id } = req.params;

    //Updating the category by sending the id. It changes the status to false
    const deletedCategory = await Category.findByIdAndUpdate( id, { status: false }, { new: true } );

    res.json( deletedCategory );
}