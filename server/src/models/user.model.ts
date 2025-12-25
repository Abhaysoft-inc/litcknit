import mongoose from "mongoose";
import type { User } from "../types/user.js";


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['admin', 'member', 'user'],
        default: 'user'
    }
});

const userModel = mongoose.model<User>('User', userSchema);

export default userModel;