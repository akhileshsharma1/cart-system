import express from "express";
import Blog from "../models/blogModel.js";
import checkAuth from "../middleware/auth.js";

const router = express.Router()

router.get("/",checkAuth, async (req,res) => {
    const blogs = await Blog.find();
    res.send(blogs);
});


router.post("/", async (req, res) => {});

router.put("/:id" , async(req,res) => {

});

router.delete("/:id", async(req,res) => {
});

export default router;
