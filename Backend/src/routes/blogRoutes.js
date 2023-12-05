import express from "express"
import { createBlog } from "../controllers/blogController.js";
const router = express.Router()

router.get("/",createBlog)

// post("/blogs") //create a blog
// get("/blogs") ////get all blogs
// get("/blogs/:id")//get a blog
// put("/blogs/:id")//update a blog
// delete("/blogs/:id")//Delete a blog
export default router;