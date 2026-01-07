import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw new Error('Please define MONGODB_URI environment variable');
}

// Declare global type for caching
declare global {
    var mongoose: {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
    };
}

// Initialize cache
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

// Optimized connection options for serverless
const options = {
    bufferCommands: false, // Disable buffering for immediate errors
    maxPoolSize: 10, // Connection pool size (good for serverless)
    minPoolSize: 2, // Minimum pool size
    serverSelectionTimeoutMS: 5000, // Timeout for server selection
    socketTimeoutMS: 45000, // Socket timeout
    maxIdleTimeMS: 10000, // Close idle connections after 10s
};

async function dbconnection() {
    // Return existing connection if available
    if (cached.conn) {
        return cached.conn;
    }

    // Create new connection if promise doesn't exist
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, options).then((mongoose) => {
            console.log('MongoDB connected successfully');
            return mongoose;
        });
    }

    try {
        // Wait for connection and cache it
        cached.conn = await cached.promise;
    } catch (error) {
        // Reset promise on error so next call retries
        cached.promise = null;
        console.error('MongoDB connection error:', error);
        throw error;
    }

    return cached.conn;
}

export default dbconnection;
