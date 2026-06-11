import Event from "../model/event.Model.js";

export const createEvent = async (req, res) => {
    const { title, totalSeats } = req.body;

    if (!title || !totalSeats) {
        return res.status(400).json({
            message: "Title and total seats are required"
        });
    }

    if (totalSeats <= 0) {
        return res.status(400).json({
            message: "Total seats must be greater than 0"
        });
    }

    try {
        const normalizedTitle = title.toLowerCase().trim();

        const existingEvent = await Event.findOne({
            title: normalizedTitle
        });

        if (existingEvent) {
            return res.status(400).json({
                message: "Event already exists"
            });
        }

        const event = await Event.create({
            title: normalizedTitle,
            totalSeats,
            availableSeats: totalSeats
        });

        return res.status(201).json({
            message: "Event created successfully",
            event
        });

    } catch (error) {
        console.error("Error creating event:", error);

        return res.status(500).json({
            message: "Failed to create event"
        });
    }
};