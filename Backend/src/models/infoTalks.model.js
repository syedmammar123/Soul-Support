
// //live session 

import mongoose from "mongoose"

const infoTalkSchema = new mongoose.Schema({
    title:"a",
    date:"A",
    time:"a",
    speaker:"a"//professional    

},{timestamps:true})

export const infoTalks = mongoose.model("infoTalk",infoTalkSchema)