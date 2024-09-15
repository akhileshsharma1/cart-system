import express from 'express';
import mongoose from 'mongoose';
import Blog from './models/blogModel.js';
import blogRouter from "./routes/blogRouter.js";
import userRouter from "./routes/userRouter.js";

mongoose.connect("mongodb://localhost:27017/CSITSB")
.then(() => console.log("DB Connected!"))
.catch((err) => console.log("Error  connecting DB: ", err.message))
const app = express();

app.use(express.json());

app.use("/api/blogs", blogRouter)
app.use("/api/users", userRouter)


app.listen(3000, () => console.log("server is up and running....."));