import { Types } from "mongoose";
import { Category, Product, Role, User } from "../models";

//Verify if the role sent by the user is a valid value compared to the DB
export const isValidRole = async( role: string = '' ) => {
    const roleExists = await Role.findOne({ role });
    if( !roleExists ){
        throw new Error(`The role ${role} does not exist in the database`);
    }
}

//Verify if the email exists and if its valid
export const emailExistsInDB = async( email: string = '' ) => {
    const emailExists = await User.findOne({ email });
    if( emailExists ){
        throw new Error(`The email: ${email} is already registered`);
    }
}

//Check if the id sent in the request is a valid Mongo id
export const isValidMongoId = async( id: string = '' ) => {
    const { ObjectId } = Types;
    if( !ObjectId.isValid( id ) ){
        throw new Error(`The id ${id} is not valid`);
    }
}

//Checks if an user exist by a specific id
export const existUserById = async( id: string = '' ) => {
    const { ObjectId } = Types;
    if( ObjectId.isValid( id ) ){
        const userExists = await User.findById( id );

        if( !userExists ){
            throw new Error(`The user with the id ${id} does not exist in the database`);
        }
    }else{
        throw new Error(`The id ${id} is not valid`);
    }
    
}

//Checks if a category exist by the id
export const existCategory = async( id: string = '' ) => {
    const { ObjectId } = Types;

    if( ObjectId.isValid( id ) ){
        const categoryExist = await Category.findById( id );

        if( !categoryExist ){
            throw new Error(`The category with the id ${id} does not exist in the database`);
        }
    }else{
        throw new Error(`The id ${id} is not valid`);
    }
}

//Checks if a product exist by the id
export const existProduct = async( id: string = '' ) => {
    const { ObjectId } = Types;

    if( ObjectId.isValid( id ) ){
        const productExist = await Product.findById( id );

        if( !productExist ){
            throw new Error(`The product with the id ${id} does not exist in the database`);
        }
    }else{
        throw new Error(`The id ${id} is not valid`);
    }
}