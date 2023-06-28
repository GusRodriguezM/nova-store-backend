import { Router } from "express";
import { param } from "express-validator";
import { search } from "../controllers/search";
import { allowedCollections } from "../helpers";
import { validateFields } from "../middlewares";

const router = Router();

const collections = [
    'categories',
    'products',
    'roles',
    'users'
];

router.get( '/:collection/:searchTerm', [
    param( 'collection' ).custom( c => allowedCollections( c, collections ) ),
    validateFields
], search );


export default router;