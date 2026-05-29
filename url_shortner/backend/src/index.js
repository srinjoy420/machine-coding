import express from "express";
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import connectDB from "./DB/index.js";
import UrlRouter from "./router/Url.routes.js"



dotenv.config()

const app=express()
app.use(express.json())
app.use(cookieParser())
const PORT=process.env.PORT
app.get("/",(req,res)=>{
    res.send("hello world")
})
app.use("/api/v1/URLshort",UrlRouter)
connectDB()
app.listen(PORT,()=>{
    console.log("app is running on ",PORT);
    
})