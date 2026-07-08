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
export const getAll=async(req,res)=>{
    try {
        const events=await Event.find()
        if(events.length===0){
            return res.status(404).json("cant find any active event")
        }
        res.status(200).json({message:"events found succesfully",events})
    } catch (error) {
        console.log("there is a error to fetch the event");
        res.status(400).json({message:"cant found events"})
        
        
    }
}