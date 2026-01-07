import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        required: true,
        trim: true // President, Vice President, Secretary, etc.
    },
    year: {
        type: String,
        required: true // 1st Year, 2nd Year, etc.
    },
    department: {
        type: String,
        required: true,
        trim: true // CSE, ECE, ME, etc.
    },
    email: {
        type: String,
        required: false,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        required: false,
        trim: true
    },
    photo: {
        type: String,
        required: false // Profile photo URL
    },
    bio: {
        type: String,
        required: false,
        trim: true
    },
    socialLinks: {
        linkedin: { type: String, trim: true },
        instagram: { type: String, trim: true },
        twitter: { type: String, trim: true }
    },
    position: {
        type: Number,
        default: 0 // For ordering members in display
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Indexes
memberSchema.index({ role: 1, position: 1 });
memberSchema.index({ isActive: 1 });

const memberModel = mongoose.models.Member || mongoose.model('Member', memberSchema);

export default memberModel;
