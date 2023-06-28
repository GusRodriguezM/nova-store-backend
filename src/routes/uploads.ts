import { Router } from "express";
import { param } from "express-validator";
import { uploadImageToCloudinary } from "../controllers/uploads";
import { validateFields, validateFileToUpload } from "../middlewares";
import { allowedCollections } from "../helpers";

const router = Router();

const collections = [ 'products', 'users' ];

router.put( '/:collection/:id', [
    validateFileToUpload,
    param( 'id', 'The id is not valid' ).isMongoId(),
    param( 'collection' ).custom( c => allowedCollections( c, collections ) ),
    validateFields
], uploadImageToCloudinary );

export default router;