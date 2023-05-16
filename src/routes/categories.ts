import { Router } from "express";
import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from "../controllers/categories";
import { isAdminRole, validateFields, validateJWT } from "../middlewares";
import { body } from "express-validator";

const router = Router();

//Get all the categories
router.get( '/', getCategories );

//Get a category by id
router.get( '/:id', getCategoryById );

//Create a category
router.post( '/', [
    validateJWT,
    isAdminRole,
    body( 'name', 'The name of the category is required' ).not().isEmpty(),
    body( 'name', 'The name of the subcategory is required' ).not().isEmpty(),
    validateFields
], createCategory );

//Update a category by id
router.put( '/:id', updateCategory );

//Delete a category by id
router.delete( '/:id', deleteCategory );


export default router;