import { Router } from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/products";

const router = Router();

//Get all the products
router.get( '/', getProducts );

//Get a product by id
router.get( '/:id', getProductById );

//Create a product
router.post( '/', createProduct );

//Update a product
router.put( '/:id', updateProduct );

//Delete a product by id
router.delete( '/:id', deleteProduct );

export default router;