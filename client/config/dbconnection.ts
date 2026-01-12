import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw new Error('Please define MONGODB_URI environment variable');
}

// Optimized connection options for serverless
const options = {
    bufferCommands: false,
    maxPoolSize: 10,
    minPoolSize: 2,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    maxIdleTimeMS: 10000,
};

// Single connection promise
let connectionPromise: Promise<typeof mongoose> | null = null;

async function dbconnection() {
    // If already connected, return immediately
    if (mongoose.connection.readyState === 1) {
        return mongoose;
    }

    // If connection is in progress, wait for it
    if (connectionPromise) {
        return connectionPromise;
    }

    // Create new connection
    connectionPromise = mongoose.connect(MONGODB_URI, options).then((mongoose) => {
        console.log('MongoDB connected successfully');
        return mongoose;
    }).catch((error) => {
        connectionPromise = null; // Reset on error
        console.error('MongoDB connection error:', error);
        throw error;
    });

    return connectionPromise;
}

export default dbconnection;
