import mongoose from "mongoose";

const blogSchema  = new mongoose.Schema(
    {
        title: {
            type : String,
            required: true,
            minlength: 3
        },
        description: {
            type: String,
            required : true,
        },
    },
    { timestamps : true }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;