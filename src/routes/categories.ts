import { Router } from "express";
import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from "../controllers/categories";
import { isAdminRole, validateFields, validateJWT } from "../middlewares";
import { body, param } from "express-validator";
import { existCategory } from "../helpers";

const router = Router();

//Get all the categories
router.get( '/', getCategories );

//Get a category by id
router.get( '/:id', [
    param( 'id' ).custom( existCategory ),
    validateFields
], getCategoryById );

//Create a category
router.post( '/', [
    validateJWT,
    isAdminRole,
    body( 'name', 'The name of the category is required' ).not().isEmpty(),
    validateFields
], createCategory );

//Update a category by id
router.put( '/:id', [
    validateJWT,
    isAdminRole,
    param( 'id' ).custom( existCategory ),
    body( 'name', 'The name of the category is required' ).not().isEmpty(),
    validateFields
], updateCategory );

//Delete a category by id
router.delete( '/:id', [
    validateJWT,
    isAdminRole,
    param( 'id' ).custom( existCategory ),
    validateFields
], deleteCategory );


export default router;