import { Request, Response } from "express";
import { Product } from "../models";
import { CustomRequest } from "../types/types";
import { Types } from "mongoose";

interface ProductReqBody {
    name: string;
    brand: string;
    status: boolean;
    price: number;
    content: string;
    quantity: number;
    description: string;
    category: Types.ObjectId;
    user: Types.ObjectId;
    [key: string]: any; //This will help to add a new property to the object with any type
}

//Controller to get all the products
export const getProducts = ( req: Request, res: Response ) => {
    res.json({
        msg: 'getProducts - ok!'
    })
}

//Controller to get a product by id
export const getProductById = ( req: Request, res: Response ) => {
    res.json({
        msg: 'getProductById - ok!'
    })
}

//Controller to create a product
export const createProduct = async( req: Request, res: Response ) => {

    const { status, user, ...body }: ProductReqBody = req.body;

    const name = body.name.toUpperCase();
    const brand = body.brand.toUpperCase();

    //Search in the database for a product with the same name
    const productFromDB = await Product.findOne({ name });

    //If exist the product return an error
    if( productFromDB ){
        return res.status(400).json({
            msg: `The product ${productFromDB.name} already exist in the database`
        });
    }

    //Getting the type user from the custom request
    const { user: userCustom } = req as CustomRequest;

    //Prepare data to send
    const data = {
        ...body,
        name,
        brand,
        user: userCustom._id
    }

    const product = new Product( data );

    await product.save();

    res.status(201).json( product );

}

//Controller to update a product by id
export const updateProduct = ( req: Request, res: Response ) => {
    res.json({
        msg: 'updateProduct - ok!'
    })
}

//Controller to delete a product by id
export const deleteProduct = ( req: Request, res: Response ) => {
    res.json({
        msg: 'deleteProduct - ok!'
    })
}