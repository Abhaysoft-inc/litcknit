import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum: ['blog', 'story', 'shayari', 'poem'],
        required: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: false // For stories/blogs
    },
    excerpt: {
        type: String,
        required: false // For blogs
    },
    isWeeklyTop: {
        type: Boolean,
        default: false
    },
    lines: [{
        type: String,
        trim: true
    }], // For shayari and poems
    category: {
        type: String,
        trim: true // Poetry, Fiction, Writing Tips, etc.
    },
    style: {
        type: String,
        trim: true // Haiku, Free Verse, etc. (for poems)
    },
    image: {
        type: String,
        required: false // Featured image for blogs
    },
    readTime: {
        type: String,
        required: false // e.g., "5 min read"
    },
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'published'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }
}, {
    timestamps: true
});

// Indexes for better query performance
postSchema.index({ type: 1, status: 1 });
postSchema.index({ createdAt: -1 });
postSchema.index({ author: 1 });

const postModel = mongoose.models.Post || mongoose.model('Post', postSchema);

export default postModel;
