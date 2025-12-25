import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

// check if mongo uri exists

if (!MONGO_URI) {
    throw new Error("MONGO_URI is not defined in environment variables");
}

export const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(MONGO_URI, {
            autoIndex: true,
        });

        console.log("Connection to DB Successfull! ");

    } catch (error) {

        console.log("Something went wrong while connecting to DB");

    }
}