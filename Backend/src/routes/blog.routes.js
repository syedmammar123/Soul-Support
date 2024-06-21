import express from "express"
import { createBlog, deleteBlog, getBlog, getBlogs, getProBlogs,searchBlog, updateBlog } from "../controllers/blog.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router()

// router.route("/").post(protect,createBlog) 
router.route("/").post(protect,upload.fields([
        {
            name: "bannerPhoto",
            maxCount: 1
        }, 
    ])
    
    ,createBlog) 

router.route("/search").get(searchBlog)
router.route("/pro").get(protect,getProBlogs) ////get all blogs of a professional
router.route("/").get(getBlogs) ////get all blogs
router.route("/:id").get(getBlog)//get a blog
router.route("/:id").put(protect,updateBlog)
router.route("/:id").delete(protect,deleteBlog)

// post("/blogs") //create a blog
// get("/blogs") ////get all blogs
// get("/blogs/:id")//get a blog
// put("/blogs/:id")//update a blog
// delete("/blogs/:id")//Delete a blog
export default router;