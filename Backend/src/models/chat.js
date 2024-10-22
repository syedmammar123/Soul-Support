import mongoose, {Schema} from "mongoose";

    const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    senderId: {
        type: String,
        required: true,
    },
    receiverId: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    });
    
export const Message  = mongoose.model("Message",messageSchema )

