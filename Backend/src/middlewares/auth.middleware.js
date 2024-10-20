import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import {asyncHandler} from '../utils/asyncHandler.js'
import { ApiError } from "../utils/ApiError.js";


const protectOld = asyncHandler(async (req,res,next)=>{
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

const protect = asyncHandler( async( req, _ , next)=>{
    console.log(req.cookies );
    console.log(req.header("Authorization") );
    
    try {

        const token = req.cookies?.accessToken || req.header("Authorization")?.split(" ")[1]    

            

        if(!token){
            throw new ApiError(401,"Unautorized User!")
        }
        
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken._id).select("-password -refreshToken")

        
    
        if(!user){
            throw new ApiError(401,"Invalid AccessToken")
        }
    
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
})

export {protect};