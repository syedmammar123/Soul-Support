import mongoose from "mongoose";
import { Professional } from "./Professional.model";

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
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
    author:{
        type:Schema.Types.ObjectId,
        ref:"Professional"
    }, //user model se
    content:{
        type:String,
        required:true,
        trim:true,
    },
    verified:{
        type:Boolean,
        default:false
    },
    index:true,//for searching
},{timestamps:true})

export const Blog = mongoose.model("Blog",blogSchema)