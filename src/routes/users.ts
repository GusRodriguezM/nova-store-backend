import { Router } from "express";
import { body, param } from 'express-validator';
import { createUser, deleteUser, editUser, getUser, getUsers } from "../controllers/users";
import { emailExistsInDB, existUserById, isValidMongoId, isValidRole } from "../helpers/db-validators";
import { validateFields } from "../middlewares/fields-validator";
import { validateJWT } from "../middlewares/validate-jwt";
import { hasRole, isAdminRole } from "../middlewares/validate-roles";
import { Roles } from "../types/types";

const router = Router();

//Get users route
router.get( '/', getUsers );

//Get user by id route
router.get( '/:id', [
    param( 'id' ).custom( existUserById ),
    validateFields
], getUser );

//Create user route
router.post( '/', [
    body( 'name', 'The name is requred' ).not().isEmpty(),
    body( 'email', 'The email is not valid' ).isEmail(),
    body( 'email' ).custom( emailExistsInDB ),
    body( 'password', 'The password should be at least 6 characters long' ).isLength({ min: 6 }),
    // body( 'role' ).custom( isValidRole ),
    validateFields
], createUser );

//Edit user route
router.put( '/:id', [
    param( 'id' ).custom( existUserById ),
    body( 'role' ).custom( isValidRole ),
    validateFields
], editUser );

//Delete user route
router.delete( '/:id', [
    validateJWT,
    isAdminRole,
    // hasRole( Roles.ADMIN, Roles.USER ),
    param( 'id' ).custom( existUserById ),
    validateFields
], deleteUser );

export default router;