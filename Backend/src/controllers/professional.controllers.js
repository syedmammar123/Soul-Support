// import { asyncHandler } from "../utils/asyncHandler";

// const createSession = asyncHandler(async (req,res)=>{

// })

// const getAllSessions = asyncHandler(async (req,res)=>{

// })

// const createSession = asyncHandler(async (req,res)=>{

// })

// export {createSession}
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/asyncHandler.js'
import {User} from '../models/user.model.js'
import { Professional } from '../models/professional.model.js';
import mongoose from 'mongoose';





const registerProo = asyncHandler(async (req, res) => {
  const {
    fName,
    lName,
    email,
    password,
    expertise,
    licenseNo,
    timings,
    specialization,
    experience,
    feePerSession,
    gender
  } = req.body;

  // Validate required fields before proceeding
  if ([
    fName,
    lName,
    email,
    password,
    expertise,
    licenseNo,
    timings,
    specialization,
    experience,
    feePerSession,
    gender
  ].some((field) => field?.trim() === "")) {
    return res.status(400).json({ error: { message: "All fields are required!" } });
  }

  const profilePicLocalPath = req.files?.profilePic[0]?.path;
  const cvLocalPath = req.files?.cv[0]?.path;

  if (!profilePicLocalPath) {
    throw new ApiError(400, "ProfilePic is required!");
  }
  if (!cvLocalPath) {
    throw new ApiError(400, "CV is required!");
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const existedUser = await User.findOne({ email });

    if (existedUser) {
      fs.unlinkSync(profilePicLocalPath);
      fs.unlinkSync(cvLocalPath);
      throw new ApiError(409, "User with email already exists");
    }

    const pic = await uploadOnCloudinary(profilePicLocalPath);
    const cv = await uploadOnCloudinary(cvLocalPath);

    // Pass session as array with user data
    const user = await User.create([
      {
        fName,
        lName,
        email,
        password,
        role: "pro",
        gender,
      }
    ], { session });

    if (!user) {
      throw new ApiError(500, "Failed to register a user");
    }

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    const pro = await Professional.create([{
      userId: user._id,
      expertise,
      licenseNo,
      timings,
      specialization,
      experience,
      feePerSession,
      profilePic: pic.url,
      cv: cv.url,
    }], { session });

    if (!pro) {
      throw new ApiError(500, "Failed to register a Professional");
    }

    await session.commitTransaction();
    return res.status(201).json(new ApiResponse(200, pro, "Professional registered successfully!"));
  } catch (error) {
    await session.abortTransaction();
    console.error("Error during registration:", error);
    throw error;
  } finally {
    session.endSession();
  }
});


const getProfessionals = asyncHandler(async (req, res) => {
  

    const pro = await Professional.find()

    if(!pro || pro.length == 0){
        res.status(404)
        throw new ApiError(404,"No therapist Found!!")
    }

    let modifiableObj = pro.map((pr)=>pr.toObject())

    for(let i = 0 ; i<modifiableObj.length ; i++){
        const user = await User.findById(pro[i].userId)
        modifiableObj[i].name = user.fName+" "+user.lName
    }

    return res.status(200).json(
        new ApiResponse(200,"You have user details here!",modifiableObj)
    )
    
})







export {getProfessionals}