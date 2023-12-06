import {asyncHandler} from '../utils/asyncHandler.js'

const registerUser = asyncHandler( async (req,res)=>{
    res.status(200).json({
        message:"ok"
    })
})
const registerPro = asyncHandler( async (req,res)=>{

})
const authUser = asyncHandler( async (req,res)=>{

})

const logoutUser = asyncHandler( async (req,res)=>{

})


export {authUser,registerUser,registerPro,logoutUser}


