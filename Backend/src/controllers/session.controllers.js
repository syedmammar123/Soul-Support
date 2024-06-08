import { Professional } from "../models/professional.model.js";
import { Session } from "../models/session.model.js";
import { User } from "../models/user.model.js";
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

    const sessions = await Session.find();

    if(!sessions || sessions.length === 0){
        throw new ApiError(404,"No Session Found!!")
    }

    let modifiableObj = sessions.map((session)=>session.toObject())
    //making this object bcz the mongoDb objects are immutable

    for(let i=0 ; i<modifiableObj.length ; i++){
        let currentSession = modifiableObj[i]
                    
        const speaker = await User.find({_id:currentSession.speaker}).select("fName lName")
        console.log(speaker[0])
        const speakerPic = await Professional.find({userId:currentSession.speaker}).select("profilePic")
        
        // const speakerPic = await Professional.find({userId:currentSession.speaker}).select("-expertise -licenseNo -timings -specialization -experience -feePerSession -cv -_id -userId -isApproved ")
        
        let name = speaker[0].fName + " " +speaker[0].lName
        modifiableObj[i].name =  name 

        let picUrl = speakerPic[0].profilePic
        modifiableObj[i].picUrl =  picUrl 
       
    } 

    return res.status(200).json(
        new ApiResponse(200,"Session Found!",modifiableObj)
    )


})

const getOneSession = asyncHandler(async (req,res)=>{

    const userId = req.user._id


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