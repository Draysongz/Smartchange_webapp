import User from "../Models/User.js";
import { createError } from "../utils/error.js";


//Update User
export const updateUser = async (req, res)=>{
    try{
        const updatedUser= await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        res.status(200).json(updatedUser)
    }catch(err){
        res.status(500).json(err)
    }
}

//Delete User


export const deleteUser = async (req, res) =>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("user deleted successfully")
    }catch(err){
        res.status(500).json(err)
    }
}

//Get User
export const getUser = async (req, res)=>{
    try{
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    }catch(err){
        res.status(500).json(err)
    }
}

//Get all User
export const getUsers = async (req, res)=>{
    try{
        const users = await User.find()
        res.status(200).json(users)
    }catch(err){
        res.status(500).json(err)
    }
}