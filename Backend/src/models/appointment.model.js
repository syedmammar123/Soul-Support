import mongoose, { Schema, SchemaType } from "mongoose";
import { ApiError } from "../utils/ApiError";

const appointmentSchema = new mongoose.Schema({
    patient:{
        type: Schema.Types.ObjectId,
        ref:"User",
        required:true,

    },
    therapist:{
        type:Schema.Types.ObjectId,
        ref:"Professional",
        required:true,

    },
    date:{
        type:Date,
        required:true,
    },
    time:{
        type:String,
        required:true,        
    }

},
{timestamps:true})

appointmentSchema.pre('save',async function(next){
    try {
        const userAppointment = await this.constructor.findOne({
            therapist: this.therapist,
            date: this.date,
            time: this.time,
        })

        const therapistAppointment = await this.constructor.findOne({
            patient: this.patient,
            date: this.date,
            time: this.time,
        });

        if(userAppointment || therapistAppointment ){
            throw new ApiError("Appointment time is not available. Please choose a different time.")
        }

        next()

    } catch (error) {
        next(error)   
    }
})

export const Appointment = mongoose.model("Appointment",appointmentSchema)