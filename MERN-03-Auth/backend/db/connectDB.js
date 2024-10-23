import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        if (conn && conn.connection && conn.connection.host) {
            console.log(`MongoDB connected: ${conn.connection.host}`);
        } else {
            console.log('No connection host');
        }
    } catch (error) {
        console.error(`Error connecting to DB: ${error.message}`);
        process.exit(1); // Exit with failure
    }
};