import { Schema, model } from "mongoose";

export interface InterfaceUser {
    name: string;
    email: string;
    password: string;
    image: string;
    role: string;
    status: boolean;
    googleAuth: boolean;
}

const UserSchema = new Schema<InterfaceUser>({
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    email: {
        type: String,
        required: [true, 'The email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'The password is required']
    },
    image: {
        type: String
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE'],
        default: 'USER_ROLE'
    },
    status: {
        type: Boolean,
        default: true
    },
    googleAuth: {
        type: Boolean, 
        default: false
    }
});

UserSchema.methods.toJSON = function(){
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

export default model<InterfaceUser>( 'User', UserSchema );