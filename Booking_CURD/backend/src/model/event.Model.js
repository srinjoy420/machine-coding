import mongoose,{Schema} from "mongoose";
const eventSchema=new Schema({
       title: {
        type: String,
        required: true,
        trim: true
    },
    totalSeats: {
        type: Number,
        required: true,
        min: 1
    },
    availableSeats: {
        type: Number,
        required: true,
        min: 0
    }
},{timestamps:true})
const Event=mongoose.model("Event",eventSchema)
export default Event