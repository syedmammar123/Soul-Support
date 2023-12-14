import mongoose, { Schema } from "mongoose"

const sessionSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    dateTime:{
        type:Date,
        required:true,
        validate:{
            validator:function(val){
                return val> new Date()
            },
            message: "Please choose a Date from future",
        }
    },
    
    speaker:{
        type:Schema.Types.ObjectId,
        ref:"Professional"
    }    

},{timestamps:true})

export const Session = mongoose.model("Session",sessionSchema)