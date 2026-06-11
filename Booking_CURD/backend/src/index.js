import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import ConnectDb from "./DB/db.js";
import evenRouter from "./routes/event.Routes.js";
import bookingRouter from "./routes/Book.event.js";




dotenv.config();


const app=express()
app.use(express.json())
app.use(cookieParser())
const Port=process.env.PORT
app.get("/",(req,res)=>{
    res.send("hello")
})
app.use("/api/v1/event",evenRouter)
app.use("/api/v1/book",bookingRouter)
ConnectDb()
app.listen(Port,()=>{
    console.log("the server is running");
    
})