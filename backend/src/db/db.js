import mongoose from "mongoose";
import { ENV } from "../utils/env.js"

const connectDB = async (req,res) => {
    try {
        const connectionInstance = await mongoose.connect(`${ENV.MONGODB_URI}`);
        console.log(`MONGODB CONNECTION IS SUCCESSFULL : HOST ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.error(`MONGODB CONNECTION ERROR : ${error.message}`);
        process.exit(1);
    }
}

export { connectDB };