import { Blog } from "../models/blog.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createBlog = asyncHandler(async (req,res)=>{
    const {title,content,category} = req.body;
    let data = [title,content,category]    

    if(data.some((field)=>field?.trim()==="")){
        res.status(400)
        throw new ApiError(400,"Fill all fields!")
    }

    if(req.user.role!=="pro"){
        res.status(500)
        throw new ApiError(500,"Only a Professional can write a blog!")
    }

    const bannerPhotoLocalPath = req.files?.bannerPhoto[0]?.path;

    if(!bannerPhotoLocalPath){
        throw new ApiError(400,"Banner Photo is required!")
    }

    const pic = await uploadOnCloudinary(bannerPhotoLocalPath);

    if(!pic){
        throw new ApiError(400,"Error in uploading Pic please try again!")
    }

    const blog = await Blog.create({
        author:req.user._id,
        title,
        bannerPhoto:pic.url,
        content,
        category
    })

    if(!blog){
        throw new ApiError(500,"Failed to create Blog!")
    }

    return res.status(200).json(
        new ApiResponse(200,"Blog created!",blog)
    )

})

const getBlogs = asyncHandler(async (req,res)=>{
    const blogs = await Blog.find();

    if(!blogs || blogs.length === 0){
        throw new ApiError(400,"No blog found!")
    }    

    return res.status(200).json(
        new ApiResponse(200,blogs)
     )
})

const getBlog = asyncHandler(async (req,res)=>{

    const blogId = req.params.id;

    if(!blogId){
        res.status(400)
        throw new ApiError(400,"Invalid blogId")
    }

    const blog = await Blog.findById(blogId)

    if (!blog) {
        res.status(404);
        throw new ApiError(404, "Blog not found");
    }

    return res.status(200).json(
        new ApiResponse(200,blog)
    )
})

const updateBlog = asyncHandler(async (req,res)=>{
    const blogId = req.params.id;

    if(!blogId){
        res.status(404)
        throw new ApiError(404,"Invalid blog id !")
    }
    
    const { title, content } = req.body;
    let data = [title,content]    

    if(data.some((field)=>field?.trim()==="")){
        res.status(400)
        throw new ApiError(400,"Fill all fields!")
    }

    const bannerPhotoLocalPath = req.files?.bannerPhoto[0]?.path;

    let updatedBlog;
    if(bannerPhotoLocalPath){
        const newPic = await uploadOnCloudinary(bannerPhotoLocalPath)

        if(!newPic){
            res.status()
            throw new ApiError(500, "Error failed to upload Picture on cloud!")
        }
                
        updatedBlog = await Blog.findByIdAndUpdate(blogId, {
            title,
            bannerPhoto:newPic.url,
            content
        })

    }else{
        updatedBlog = await Blog.findByIdAndUpdate(blogId, {title,content})
    }
    
    if(!updatedBlog){
        throw new ApiError(500,"Failed to create Blog!")
    }

    return res.status(200).json(
        new ApiResponse(200,"Blog updated!",updatedBlog)
    )
})

const deleteBlog = asyncHandler(async (req,res)=>{
    const blogId = req.params.id

    if(!blogId){
        res.status(404)
        throw new ApiError(404,"Invalid blog id !")
    }

    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    if(!deletedBlog){
        res.status(400)
        throw new ApiError(400,"Failed to delete Blog!")
    }

    return res.status(200).json(
        new ApiResponse(200,"Blog Deleted!",deletedBlog)
    )

})

const searchBlog = asyncHandler(async (req,res)=>{
    let {key} = req.query;
    
    const blog = await Blog.find({title:{$regex:key,$options:"i"}});

    return res.status(200).json(
        new ApiResponse(200,"search result!",blog)
    )

    
    

})


export {createBlog,getBlogs,getBlog,updateBlog,deleteBlog,searchBlog};