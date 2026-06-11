import mongoose,{Schema} from "mongoose";
const BookingSchema=new Schema({
    userName:{
        type:String
    },
    eventId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Event",
        required:true
    },
    seatsBooked: {
        type: Number,
        required: true,
        min: 1
    }
},{timestamps:true})
const Booking=mongoose.model("Booking",BookingSchema)
export default Booking