import { Router } from "express";
import {Createnotes,GetallNotes,searchByStatus,UpdateNotes,deleteNotes} from "../controller/Todo.controller.js"

const TodoRouter = Router();

TodoRouter.post("/create", Createnotes);
 TodoRouter.get("/getall", GetallNotes);
TodoRouter.get("/status", searchByStatus);   
TodoRouter.put("/update/:id", UpdateNotes);
TodoRouter.delete("/delete/:id", deleteNotes); 

export default TodoRouter;