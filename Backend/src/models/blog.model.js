import mongoose, { Schema } from "mongoose";
// import { Professional } from "./Professional.model";

const blogSchema = new mongoose.Schema({
    author:{
        type: Schema.Types.ObjectId,
        ref:"Professional"
    }, 
    title:{
        type:String,
        trim:true,
        required:true,
    },
    bannerPhoto:{
        type:String, //cloudinary
        required:true
    },
    category:{
        type:[{
            type:String,
            enum:["Depression","Anxiety","Stress","Therapy","General"]
        }],
        required:true
    },
    content:{
        type:String,
        required:true,
        trim:true,
    },
    verified:{
        type:Boolean,
        default:false
    },

    // index:true,

},{timestamps:true})



export const Blog = mongoose.model("Blog",blogSchema)