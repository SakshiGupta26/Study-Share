import mongoose from "mongoose";
import config from "./env.js";

const connectDB = async () => {
    try{
    const mongourl = config.MONGO_URI;
    if(!mongourl){
        throw new Error("MONGO URL Missing");
    }
    await mongoose.connect(mongourl);
    console.log("MongoDB is connect successfully!");
    } catch(error){
        console.log(`Error in connecting MongoDB and I come from db: ${error}`);

    }
}

export default connectDB;