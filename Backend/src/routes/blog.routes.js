import express from "express"
import { createBlog } from "../controllers/blogController.js";

const router = express.Router()

router.post("/") //create a blog
router.get("/") ////get all blogs
router.get("/:id")//get a blog
router.put("/:id")//update a blog
router.delete("/:id")//Delete a blog

// post("/blogs") //create a blog
// get("/blogs") ////get all blogs
// get("/blogs/:id")//get a blog
// put("/blogs/:id")//update a blog
// delete("/blogs/:id")//Delete a blog
export default router;