import { asyncHandler } from "../utils/asyncHandler.js";
import { Message } from "../models/chat.js"; 
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const sendMessage = asyncHandler(async (req, res) => {
  const { message, senderId, receiverId } = req.body;

  const newMessage = new Message({ message, senderId, receiverId });

  const savedMessage = await newMessage.save();

  if (!savedMessage) {
    throw new ApiError(400, "Failed to send message");
  }

  return res.status(201).json(
    new ApiResponse(201, "Message sent successfully", savedMessage)
  );
});


const getMessages = asyncHandler(async (req, res) => {
  const { userId, otherUserId } = req.query;

  const messages = await Message.find({
    $or: [
      { senderId: userId, receiverId: otherUserId },
      { senderId: otherUserId, receiverId: userId },
    ],
  }).sort({ createdAt: 1 });

  if (!messages || messages.length === 0) {
    res.status(404);
    throw new ApiError(404, "No messages found!");
  }

  return res.status(200).json(
    new ApiResponse(200, "Messages fetched successfully", messages)
  );
});



export {sendMessage,getMessages}