import { Router } from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/products";
import { isAdminRole, validateFields, validateJWT } from "../middlewares";
import { body } from "express-validator";
import { existCategory } from "../helpers";

const router = Router();

//Get all the products
router.get( '/', getProducts );

//Get a product by id
router.get( '/:id', getProductById );

//Create a product
router.post( '/', [
    validateJWT,
    isAdminRole,
    body( 'name', 'The name of the product is required' ),
    body( 'brand', 'The brand name of the product is required' ),
    body( 'category' ).custom( existCategory ),
    validateFields
], createProduct );

//Update a product
router.put( '/:id', updateProduct );

//Delete a product by id
router.delete( '/:id', deleteProduct );

export default router;