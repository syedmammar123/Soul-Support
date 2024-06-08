import OpenAI from "openai";
import { asyncHandler } from "../utils/asyncHandler.js";
import { GptChat } from "../models/supportGpt.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const postChatt = asyncHandler(async (req, res) => {
     
    const { message } = req.body;
    const { _id } = req.user;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are an empathetic and supportive friend providing emotional support and guidance to users seeking help with their mental health. Respond to users as if you are a caring friend, offering comfort, understanding, and helpful insights. Encourage open conversation and provide positive and uplifting responses. Your goal is to create a safe and supportive space for users to share and discuss their feelings.' },
        { role: 'user', content: message },
      ],
    });

    const { message: generatedMessage } = completion.choices[0];

    // Store chat log in the database
    const chat = await GptChat.find({user:_id})

    if(!chat){
        const newChat = await GptChat.create({
        user:_id,
        userMsg:message,
        gptReply:generatedMessage.content,
    })
    if(!newChat){
        throw new ApiError(400,"No !!")
    }else{
        return res.status(200).json({ message: generatedMessage.content ,newChat });
    }
    }
    
    await chat.userMsg.push(message);
    await chat.gptReply.push(generatedMessage.content);
    
    

    res.status(200).json({ message: generatedMessage.content ,newChat });
    // res.status(500).json({ error: 'Something went wrong' });
})

const postChate = asyncHandler(async (req, res) => {
  const { message } = req.body;
//   const { _id } = req.user;
  const  _id = '65787c36c195a062420e528b'

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          'You are an emotional support friend.',
      },
      { role: 'user', content: message },
    ],
  });
  console.log(completion.choices[0])
  const { message: generatedMessage } = completion.choices[0];

  // Store chat log in the database
  const chat = await GptChat.findOne({ user: _id });

  if (!chat) {
    const newChat = await GptChat.create({
      user: _id,
      userMsg: [message],
      gptReply: [generatedMessage.content],
    });

    if (!newChat) {
      throw new ApiError(400, 'No chat created');
    } else {
      return res.status(200).json({ message: generatedMessage.content, newChat });
    }
  }

  chat.userMsg.push(message);
  chat.gptReply.push(generatedMessage.content);

  await chat.save();

  res.status(200).json({ message: generatedMessage.content, chat });
});

const postChat = asyncHandler(async (req, res) => {
  const { message } = req.body;
  const { _id } = req.user;

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    temperature:0,
    messages: [
      {
        role: 'system',
        content:
          'You are an emotional support friend.',
      },
      { role: 'user', content: message },
    ],
  });
  const { message: generatedMessage } = completion.choices[0];

  // Store chat log in the database
  const chat = await GptChat.findOne({ user: _id });

    if(!chat) {
    const newChat = await GptChat.create({
      user: _id,
      messages: [{
        userMsg: message,
        gptMessage: generatedMessage.content,
      }],
    });

    if(!newChat) {
      throw new ApiError(400, 'No chat created');
    } else {
      return res.status(200).json({ message: generatedMessage.content });
    }}

    chat.messages.push({
        userMsg: message,
        gptMessage: generatedMessage.content,
    });

    await chat.save();
    res.status(200).json({ message: generatedMessage.content });
});


const getChat = asyncHandler(async (req, res) => {

    const id = req.user._id; 

    const chat = await GptChat.find({user:id})

    if(!chat || chat.length == 0){
        res.status(404)
        throw new ApiError(404,"No Chat found!")
    }

    return res.status(200).json(
        new ApiResponse(200,"You have chat here!",chat)
    )
    
})

export {getChat,postChat}



