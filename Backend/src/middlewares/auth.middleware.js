import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import {asyncHandler} from '../utils/asyncHandler.js'
import { ApiError } from "../utils/ApiError.js";


const protect = asyncHandler(async (req,res,next)=>{
    let token;
    token = req.cookies.jwt;

    if(token){
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);          
            req.user = await User.findById(decode.userId).select('-password -refreshToken')
            next();
        }catch(error){
            throw new ApiError(401,"Not authorized, Invalid token!")
        }
    }else{
        throw new ApiError(401,"Not authorized, no token!")
    }
})

export {protect};