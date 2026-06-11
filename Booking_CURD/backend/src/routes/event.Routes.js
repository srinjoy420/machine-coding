import {Router} from "express"
import { createEvent } from "../controller/event.controller.js"


const evenRouter=Router()
evenRouter.post("/create",createEvent)

export default evenRouter