import Role from "../models/role";
import User from "../models/user";

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