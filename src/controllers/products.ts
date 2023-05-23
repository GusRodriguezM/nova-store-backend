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
export const getProducts = async( req: Request, res: Response ) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { status: true };

    /**
     * Promise that resolves:
     * 1. Count all the documents with the status = true
     * 2. Find all documents (with status = true) with the info about the (related) Category and the user who created it
     */
    const [ total, products ] = await Promise.all([
        Product.countDocuments( query ),
        Product.find( query )
            .populate( 'user', 'name' )
            .populate( 'category', 'name' )
            .skip( Number( from ) )
            .limit( Number( limit) )
    ]);

    res.json({ total, products });
}

//Controller to get a product by id
export const getProductById = async( req: Request, res: Response ) => {

    const { id } = req.params;

    //Returns the product with the reference of the user and the category
    const product = await Product.findById( id )
        .populate( 'user', 'name' )
        .populate( 'category', 'name' );

    res.json( product );
    
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
export const updateProduct = async( req: Request, res: Response ) => {

    const { id } = req.params;
    const { status, user, ...body }: ProductReqBody = req.body;

    if( body.name ){
        body.name = body.name.toUpperCase();
    }

    if( body.brand ){
        body.brand = body.brand.toUpperCase();
    }

    //Getting the type user from the custom request
    const { user: userCustom } = req as CustomRequest;

    //Prepare the data to send
    const data = {
        ...body,
        user: userCustom._id
    }

    //Updating only the properties that come in the request
    const product = await Product.findByIdAndUpdate( id, data, { new: true } );

    res.json( product );

}

//Controller to delete a product by id
export const deleteProduct = async( req: Request, res: Response ) => {

    const { id } = req.params;

    //Finds the product to delete and changes the status to false
    const deletedProduct = await Product.findByIdAndUpdate( id, { status: false }, { new: true } );
    
    res.json( deletedProduct );
}