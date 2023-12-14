import { Session } from "../models/session.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createSession = asyncHandler(async (req,res)=>{
    const {title,dateTime} = req.body;

    if(title==="" || dateTime ===""){
        res.status(400)
        throw new ApiError(400,"Please provide all fields");
    }

    const session = await Session.create({
        title,
        dateTime,
        speaker:req.user._id
    })

    if(!session){
        throw new ApiError(500,"Failed to create Session!")
    }

    return res.status(200).json(
        new ApiResponse(200,"Session created!",session)
    )    

})

const getAllSessions = asyncHandler(async (req,res)=>{

    const sessions = await Session.find()

    if(!sessions || sessions.length === 0){
        throw new ApiError(404,"No Session Found!!")
    }

    return res.status(200).json(
        new ApiResponse(200,"Session Found!",sessions)
    )


})

const getOneSession = asyncHandler(async (req,res)=>{

    const userId = req.user._id
    console.log(userId)


    const sessions = await Session.find({
        speaker:userId
    })

    if(!sessions || sessions.length === 0){
        throw new ApiError(404,"No Session Found!!")
    }

    return res.status(200).json(
        new ApiResponse(200,"Session Found!",sessions)
    )


})

export {createSession,getAllSessions,getOneSession}