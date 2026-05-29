import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
const UrlSchema=mongoose.Schema({
    OriginalUrl:{
        type:String,
        required:true
    },
    ShortUrl:{
        type:String,
        unique:true,
        required:true
    },
    clicks:{
        type:Number,
        default:0
    },
    visitHistory:[{timeStamp:{type:Number}}]

},{timestamps:true})
const URL=mongoose.model("URL",UrlSchema)
export default URL