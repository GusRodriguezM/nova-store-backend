import { Request, Response } from "express";

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
export const createProduct = ( req: Request, res: Response ) => {
    res.json({
        msg: 'createProduct - ok!'
    })
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