import express from "express"
import dotenv from "dotenv"
import cors  from "cors"
dotenv.config()
import cookieparser from "cookie-parser"
import connectDB from "./DB/db.js"
import TodoRouter from "./Routes/notes.routes.js"





const app=express()
app.use(express.json())
//cors
app.use(
    cors({
        origin:"http://localhost:5173",
        credentials:true
    })
)
app.use(cookieparser())
const port=process.env.PORT
app.get("/",(req,res)=>{
    res.send("hello world")
})
//custom routes
app.use("/api/v1/todo",TodoRouter)
connectDB()
app.listen(port,()=>{
    console.log("app is running succesfully");
    
})
