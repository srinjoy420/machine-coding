import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("mongoDb connect succesfully");
        
    } catch (error) {
        console.log("cant connect with mongDb");
        process.exit(1)
        
        
    }
}
export default connectDB