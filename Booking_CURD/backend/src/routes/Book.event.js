
import {Router} from "express"
import { BookEvent,findBookings } from "../controller/Booking.controller.js";
const bookingRouter=Router()
bookingRouter.post("/event/:eventId",BookEvent)
bookingRouter.get("/event/:eventId/bookings",findBookings)


export default bookingRouter

