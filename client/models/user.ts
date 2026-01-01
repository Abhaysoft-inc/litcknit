import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['admin'],
        default: "admin"
    }
});

const userModel = mongoose.models.User || mongoose.model('User', userSchema);

export default userModel;