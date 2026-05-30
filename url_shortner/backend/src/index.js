import express from "express";
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./DB/index.js";
import UrlRouter from "./router/Url.routes.js"



dotenv.config()

const app=express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))
const PORT=process.env.PORT
app.get("/",(req,res)=>{
    res.send("hello world")
})
app.use("/api/v1/URLshort",UrlRouter)
connectDB()
app.listen(PORT,()=>{
    console.log("app is running on ",PORT);
    
})