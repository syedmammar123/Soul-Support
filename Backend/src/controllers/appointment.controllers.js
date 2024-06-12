import { Appointment } from "../models/appointment.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"

const getAppointments = asyncHandler(async (req,res)=>{

    const {_id,role} = req.user;

    let appointment;

    if(role === "pro"){
        appointment = await Appointment.find({therapist:_id})
    }else{
        appointment = await Appointment.find({patient:_id})
    }  

    if(!appointment || appointment.length === 0){
        throw new ApiError(404,"No appointment Found!!")
    }

    let modifiableObj = appointment.map((app)=>app.toObject())
    // patientName
    // therapistName
    for(let i = 0 ; i<modifiableObj.length ; i++){
        const patientName = await User.findById(appointment[i].patient)
        const therapistName = await User.findById(appointment[i].therapist)
        modifiableObj[i].patientName = patientName.fName+" "+patientName.lName
        modifiableObj[i].therapistName = therapistName.fName+" "+therapistName.lName
    }




    return res.status(200).json(
        new ApiResponse(200,"Appointment Found!",modifiableObj)
    )
})

const createAppointment = asyncHandler(async (req,res)=>{
    const {therapist,date,time} = req.body;
    // console.log(req.user._id,therapist,date,time)

    if(therapist==""|| date=="" || time==""){
        res.status(400)
        throw new ApiError(400,"Please provide all fields");
    }


    const appoint = await Appointment.create({
        patient:req.user._id,
        therapist,
        date,
        time,
    })
    
    if(!appoint){
        res.status(400);
        throw new ApiError(400,"Failed to create new appointment")
    }

    return res.status(200).json(
        new ApiResponse(201,"Appointment created!", appoint)
    )
    
})

export {getAppointments,createAppointment};