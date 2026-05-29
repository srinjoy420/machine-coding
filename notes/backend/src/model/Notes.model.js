import mongoose from "mongoose";
import dotenv from "dotenv";
import { AvailableRoles } from "../lib/contants.js";


dotenv.config();

const notesSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
        },
        status: {
            type: String,
            enum: Object.values(AvailableRoles),   // ["InProgress", "Done", "Pending"]
            default: AvailableRoles.INPROGRESS,     // "InProgress"
        },
    },
    { timestamps: true }
);

const Todo = mongoose.model("Todo", notesSchema);
export default Todo;