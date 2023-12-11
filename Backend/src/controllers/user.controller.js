import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/asyncHandler.js'
import {User} from '../models/user.model.js'
import { Professional } from '../models/professional.model.js';
import { uploadOnCloudinary } from '../utils/Cloudinary.js';
import fs from 'fs'
import mongoose from 'mongoose';
import { log } from 'console';


const registerUser = asyncHandler( async (req,res)=>{
    // data lia email dekhi k hai tou nhi, uske baad maine daldia apne model mai

    const {fName,lName,email,password,gender} = req.body;

    //.some is like map but it runs for each item of array and returns true if atleast 1 such condition is found, in my case it will search for atleast one field to be empty. 
    if([fName,lName,email,password,gender].some((field)=>field?.trim()==="")){
        res.status(400)
        throw new ApiError(400,"All fields are required!")
    }

    // const existedUser = User.findOne({$or:[{fName},{email}]})
    const existedUser = await User.findOne({email})

    if(existedUser){
        throw new ApiError(409,"User email already exists!")
    }

    const user = await User.create({
        fName,
        lName,
        email,
        password,
        gender
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    // I didnot use  findById(user._id)?.select() here bcz findById(user._id) will return null if nothing is found and we can call .select() on null.

    if(!createdUser){
        throw new ApiError(500,"Failed to register a user")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered successfully!")
    )
    
})

const registerPro = asyncHandler( async (req,res)=>{


    const {fName,lName,email,
        password,expertise,
        licenseNo,timings,
        specialization,experience,
        feePerSession,gender} = req.body;

    if([fName,lName,email,
        password,
        expertise,licenseNo,timings,
        specialization,experience,
        feePerSession,gender].some((field)=>field?.trim()==="")){
        res.status(400)
        throw new ApiError(400,"All fields are required!")
    }

    const profilePicLocalPath = req.files?.profilePic[0]?.path;
    const cvLocalPath = req.files?.cv[0]?.path;
    
    if(!profilePicLocalPath){
        throw new ApiError(400,"profilePic is required!")
    }
    if(!cvLocalPath){
        throw new ApiError(400,"Cv is required!")
    }

    const existedUser = await User.findOne({email})
    

    if (existedUser) {
        fs.unlinkSync(profilePicLocalPath) 
        fs.unlinkSync(cvLocalPath)
        throw new ApiError(409, "User with email already exists")
    }
    
    const pic = await uploadOnCloudinary(profilePicLocalPath)
    const cv = await uploadOnCloudinary(cvLocalPath)

    const user = await User.create({
        fName,
        lName,
        email,
        password,
        role:"pro",
        gender,
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")


    if(!user){
        throw new ApiError(500,"Failed to register a user")
    }

    const pro = await Professional.create({
        userId: user._id,
        expertise,
        licenseNo,
        timings,
        specialization,
        experience,
        feePerSession,
        profilePic: pic.url,
        cv: cv.url,
    })
    


    const createdPro = await Professional.findById(pro?._id)?.select("-cv -profilePic")
    
    if (!pro) {
    try {
        await User.deleteOne({ email });
        throw new ApiError(500, "Failed to register a Professional");
    } catch (err) {
        // Handle the error during user deletion
        console.error("Error deleting user:", err);

        // Optionally, throw a new ApiError or take other actions based on the error
        throw new ApiError(500, "Failed to register a Professional and delete its User instance from the database");
    }
    }

    return res.status(201).json(
        new ApiResponse(200,createdPro,"Professional registered successfully!")
    )

})

const registerPro1 = asyncHandler( async (req,res)=>{


    const {fName,lName,email,
        password,expertise,
        licenseNo,timings,
        specialization,experience,
        feePerSession,gender} = req.body;

    if([fName,lName,email,
        password,
        expertise,licenseNo,timings,
        specialization,experience,
        feePerSession,gender].some((field)=>field?.trim()==="")){
        res.status(400)
        throw new ApiError(400,"All fields are required!")
    }

    const profilePicLocalPath = req.files?.profilePic[0]?.path;
    const cvLocalPath = req.files?.cv[0]?.path;
    
    if(!profilePicLocalPath){
        throw new ApiError(400,"profilePic is required!")
    }
    if(!cvLocalPath){
        throw new ApiError(400,"Cv is required!")
    }

    const existedUser = await User.findOne({email})
    

    if (existedUser) {
        fs.unlinkSync(profilePicLocalPath) 
        fs.unlinkSync(cvLocalPath)
        throw new ApiError(409, "User with email already exists")
    }
    
    const pic = await uploadOnCloudinary(profilePicLocalPath)
    const cv = await uploadOnCloudinary(cvLocalPath)

    const user = await User.create({
        fName,
        lName,
        email,
        password,
        role:"pro",
        gender,
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")


    if(!createdUser){
        throw new ApiError(500,"Failed to register a user")
    }

    const pro = await Professional.create({
        userId: user._id,
        expertise,
        licenseNo,
        timings,
        specialization,
        experience,
        feePerSession,
        profilePic: pic.url,
        cv: cv.url,
    })
    


    const createdPro = await Professional.findById(pro?._id)?.select("-cv -profilePic")
    
    if (!createdPro) {
    try {
        await User.deleteOne({ email });
        throw new ApiError(500, "Failed to register a Professional");
    } catch (err) {
        // Handle the error during user deletion
        console.error("Error deleting user:", err);

        // Optionally, throw a new ApiError or take other actions based on the error
        throw new ApiError(500, "Failed to register a Professional and delete its User instance from the database");
    }
    }

    return res.status(201).json(
        new ApiResponse(200,createdPro,"Professional registered successfully!")
    )

})

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


const authUser = asyncHandler( async (req,res)=>{

})

const logoutUser = asyncHandler( async (req,res)=>{

})


export {authUser,registerUser,registerPro,logoutUser}