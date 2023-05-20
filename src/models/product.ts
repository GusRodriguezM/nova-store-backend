import { Schema, model } from "mongoose";

export interface InterfaceProduct {
    name: string;
    brand: string;
    status: boolean;
    price: number;
    content: string;
    quantity: number;
    description: string;
    available: boolean;
    image: string;
    category: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId
}

const ProductSchema = new Schema<InterfaceProduct>({
    name: {
        type: String,
        required: [true, 'The name is required'],
        unique: true
    },
    brand: {
        type: String,
        required: [true, 'The brand is required'],
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    content: {
        type: String,
        default: ""
    },
    quantity: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        default: ""
    },
    available: {
        type: Boolean,
        default: true
    },
    image: {
        type: String
    },
    //Setting the reference to the Category model
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    //Setting the reference to the User model
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

ProductSchema.methods.toJSON = function() {
    const { __v, status, ...product } = this.toObject();
    return product;
}

export default model<InterfaceProduct>( 'Product', ProductSchema );