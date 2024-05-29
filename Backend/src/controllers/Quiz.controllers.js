import { Quiz, Result } from "../models/quiz.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getCategory = asyncHandler(async (req,res)=>{
    const categories = await Quiz.distinct('category')


      if(!categories || categories.length === 0){
        throw new ApiError(400,"No Question category found!")
    }    

    return res.status(200).json(
        new ApiResponse(200,categories)
    )
    
})

const getQuestions = asyncHandler(async (req,res)=>{
    const category = req.params.id;
    const questions = await Quiz.find({category}).select("-_id -results -source")


      if(!questions || questions.length === 0){
        throw new ApiError(400,"No Question category found!")
    }    

    return res.status(200).json(
        new ApiResponse(200,questions)
    )
})

const getResults = asyncHandler(async (req,res)=>{

    const {category,points} = req.params;
    // const {points} = req.body


    const results = await Result.findOne({
        category,
        "results": {
            $elemMatch: {
                "range.min": { $lte: points },
                "range.max": { $gte: points }
            }
        }
    }, { "results.$": 1}).select("-_id -category");


    if(!results || results.length === 0){
        throw new ApiError(400,"No Question category found!")
    }    

    return res.status(200).json(
            new ApiResponse(200,results)
        )
})


export {getCategory,getQuestions,getResults}