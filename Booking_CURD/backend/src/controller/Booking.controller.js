import Booking from "../model/Booking.Model.js";
import Event from "../model/event.Model.js";
import mongoose from "mongoose";

export const BookEvent = async (req, res) => {
    const { eventId } = req.params
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        return res.status(400).json({
            message: "Invalid event id"
        });
    }
    const { userName, seatsBooked } = req.body
    if (!userName || !seatsBooked) {
        return res.status(400).json({
            message: "usernamae and seats count are required"
        });
    }
    try {
        if (seatsBooked <= 0) {
            return res.status(400).json({
                message: "Tseats must be greater than 0"
            });
        }
        const event = await Event.findById(eventId)
        if (!event) {
            return res.status(400).json({ "message": "this is not a valid event" })
        }
        if (event.availableSeats < seatsBooked) {
            return res.status(400).json({ message: "not that many seats avalible" })
        }

        const booking = await Booking.create({
            userName,
            eventId,
            seatsBooked
        })

        event.availableSeats -= seatsBooked
        await event.save()
        res.status(200).json({ message: "booking confirm", booking })

    } catch (error) {
        console.log("the booking faliour", error);
        return res.status(500).json({
            message: "Failed to bok the event"
        });


    }
}

export const findBookings = async (req, res) => {
    const { eventId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        return res.status(400).json({
            message: "Invalid event id"
        });
    }

    try {
        const bookings = await Booking.find({
            eventId
        }).populate("eventId", "title totalSeats availableSeats");

        if (bookings.length === 0) {
            return res.status(404).json({
                message: "No bookings found for this event"
            });
        }

        return res.status(200).json({
            message: "Bookings fetched successfully",
            bookings
        });

    } catch (error) {
        console.error("Error fetching bookings:", error);

        return res.status(500).json({
            message: "Failed to fetch bookings"
        });
    }
};
export const deleteBooking = async (req, res) => {
    const { bookingId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
        return res.status(400).json({
            message: "Invalid booking id"
        });
    }

    try {
        // Find booking
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        // Find related event
        const event = await Event.findById(booking.eventId);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        // Restore seats
        event.availableSeats += booking.seatsBooked;
        await event.save();

        // Delete booking
        await booking.deleteOne();

        return res.status(200).json({
            message: "Booking cancelled successfully"
        });

    } catch (error) {
        console.error("Error deleting booking:", error);

        return res.status(500).json({
            message: "Failed to cancel booking"
        });
    }
};