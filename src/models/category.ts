import { Schema, model } from "mongoose";

export interface InterfaceCategory {
    name: string;
    status: boolean;
    user: Schema.Types.ObjectId;
}

const CategorySchema = new Schema<InterfaceCategory>({
    name: {
        type: String,
        required: [true, 'The category name is required'],
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    //Setting the reference to the User model
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

});

CategorySchema.methods.toJSON = function() {
    const { __v, status, ...category } = this.toObject();
    return category;
}

export default model<InterfaceCategory>( 'Category', CategorySchema );