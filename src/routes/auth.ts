import { Router } from "express";
import { body } from 'express-validator';
import { login } from "../controllers/auth";
import { validateFields } from "../middlewares";

const router = Router();

router.post( '/login', [
    body( 'email', 'The email is not valid' ).isEmail(),
    body( 'password', 'The password is required' ).not().isEmpty(),
    validateFields
], login );


export default router;