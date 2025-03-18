import mongoose from "mongoose"

export const connectDb = async ()=> {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected!");

    }catch (error){
        console.log("MongoDB connect error: ",error);
    }
}