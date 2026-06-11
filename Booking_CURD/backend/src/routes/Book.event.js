
import {Router} from "express"
import { BookEvent,findBookings,deleteBooking } from "../controller/Booking.controller.js";
const bookingRouter=Router()
bookingRouter.post("/event/:eventId",BookEvent)
bookingRouter.get("/event/:eventId/bookings",findBookings)
bookingRouter.delete("/bookings/:bookingId", deleteBooking);


export default bookingRouter

