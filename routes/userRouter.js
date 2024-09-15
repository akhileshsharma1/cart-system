import express from "express";
import User from "../models/userModel.js"

const router = express.Router();

router.post("/signup", async (req, res) => {
    const {fullname, email, password} = req.body;
    const User = await User.findOne({email});
    if(user) {
        return res.status(400).send({error:"User already registered! "});
    }
    const newUser = await User.create({ fullname, email, password});
    res.send({message : "User registered", user: newuser});
});

router.post("/login", async (req, res) => {
    const {email , password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).send({error: "User not registered!"})
    }
    if(await bcry){
        res.send({message : "Login Successful"});
    }else {
        return res.status(400).send({error: "Password not matched!!"})
    }
});

export default router;