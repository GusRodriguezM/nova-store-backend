import { Schema, model } from "mongoose";

interface IRole {
    role: string
}

const RoleSchema = new Schema<IRole>({
    role: {
        type: String,
        required: [true, 'The role is required']
    }
});

export default model<IRole>( 'Role', RoleSchema );