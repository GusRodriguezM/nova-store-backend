import { Request, Response } from "express";
import { Category } from "../models";
import { CustomRequest } from "../types/types";

type ReqBody = {
    name: string;
    subcategory: string;
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
export const updateCategory = ( req: Request, res: Response ) => {
    res.json({
        msg: 'Todo ok!'
    });
}

//Delete category by id
export const deleteCategory = ( req: Request, res: Response ) => {
    res.json({
        msg: 'Todo ok!'
    });
}