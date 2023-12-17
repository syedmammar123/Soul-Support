import mongoose, {Schema} from "mongoose";

const gptChatSchema = new mongoose.Schema({
    user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  messages: [
    {
      userMsg: {
        type: String,
        required: true,
      },
      gptMessage: {
        type: String,
        required: true,
      },
    },
  ],
}, {
  timestamps: true,
});
export const GptChat = mongoose.model("GptChat",gptChatSchema)

