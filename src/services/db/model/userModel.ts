import { Schema, model } from 'mongoose';
import { Document } from 'mongoose';
export interface User extends Document {
    name: string;
    email: string;
    avatar?: string;
}

const schema = new Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: String
});
export const UserModel = model<User>('User', schema);