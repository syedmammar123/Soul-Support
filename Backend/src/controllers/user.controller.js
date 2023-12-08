import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/asyncHandler.js'
import {User} from '../models/user.model.js'


const registerUser = asyncHandler( async (req,res)=>{
    // data lia email dekhi k hai tou nhi, uske baad maine daldia apne modle maoi

    const {fName,lName,email,role,password,refreshToken} = req.body;

    //.some is like map but it runs for each item of array and returns true if atleast 1 such condition is found, in my case it will search for atleast one field to be empty. 
    if([fName,lName,email,password,refreshToken].some((field)=>field?.trim()==="")){
        res.status(400)
        throw new ApiError(400,"All fields are required!")
    }

    // const existedUser = User.findOne({$or:[{fName},{email}]})
    const existedUser = User.findOne({email})

    if(existedUser){
        throw new ApiError(409,"User email already exists!")
    }

    const user = await User.create({
        fName,
        lName,
        email,
        password,
    })

    const createdUser = User.findById(user._id).select("-password -refreshToken")
    // I didnot use  findById(user._id)?.select() here bcz findById(user._id) will return null if nothing is found and we can call .select() on null.

    if(!createdUser){
        throw new ApiError(500,"Failed to register a user")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered successfully!")
    )
    
})
const registerPro = asyncHandler( async (req,res)=>{

})
const authUser = asyncHandler( async (req,res)=>{

})

const logoutUser = asyncHandler( async (req,res)=>{

})


export {authUser,registerUser,registerPro,logoutUser}


