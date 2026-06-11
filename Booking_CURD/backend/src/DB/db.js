import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const ConnectDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("mongodb connect succefully");
        
    } catch (error) {
        console.error("mongodb not connected",error)
        process.exit(1)
        
        
    }
}
export default ConnectDb