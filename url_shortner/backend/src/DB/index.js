import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("database connected succesfully")
    } catch (error) {
        console.log("there is a problem to connect mongoDB");
        process.exit(1)
        
    }
}
export default connectDB