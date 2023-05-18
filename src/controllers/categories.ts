import { Request, Response } from "express";
import { Category } from "../models";
import { CustomRequest } from "../types/types";

interface CategoryReqBody {
    name: string;
    subcategory: string;
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
export const getCategories = ( req: Request, res: Response ) => {
    res.json({
        msg: 'Todo ok!'
    });
}

//Get category by id
export const getCategoryById = ( req: Request, res: Response ) => {
    res.json({
        msg: 'Todo ok!'
    });
}

//Create a new category
export const createCategory = async( req: Request, res: Response ) => {

    // const { name, subcategory }: ReqBody = req.body;
    const name: string = req.body.name.toUpperCase();
    const subcategory: string = req.body.subcategory.toUpperCase();

    //Searchs for a category and subcategory
    const categoryDB = await Category.findOne({ name, subcategory });

    //Searches in the database for any other category with the same name
    if( categoryDB ){
        return res.status(400).json({
            msg: `The category ${name} with subcategory ${subcategory} already exists`
        });
    }

    //Getting the type user from the custom request
    const { user } = req as CustomRequest;

    //Prepare the data to save in the DB
    const data = {
        name,
        subcategory,
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
    data.subcategory = data.subcategory.toUpperCase();
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