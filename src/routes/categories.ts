import { Router } from "express";
import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from "../controllers/categories";

const router = Router();

//Get all the categories
router.get( '/', getCategories );

//Get a category by id
router.get( '/:id', getCategoryById );

//Create a category
router.post( '/', createCategory );

//Update a category by id
router.put( '/:id', updateCategory );

//Delete a category by id
router.delete( '/:id', deleteCategory );


export default router;