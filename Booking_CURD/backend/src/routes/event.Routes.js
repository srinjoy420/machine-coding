import {Router} from "express"
import { createEvent,getAll } from "../controller/event.controller.js"


const evenRouter=Router()
evenRouter.post("/create",createEvent)
evenRouter.get("/all",getAll)

export default evenRouter