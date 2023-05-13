import Chat from '../Model/chatModel'
import connectDB from '../db/connection'


connectDB()
export const createChat = async (req, res)=>{
    const newChat = new Chat({
        users: [req.body.senderId, req.body.receiverId]
    })

    try{
        const result = await newChat.save();
        res.status(200).json(result);
    }catch(err){
        res.status(500).json(err)
    }
}


export const userChats = async (req, res) =>{
    try{
        const userId = req.query.userId;
        const chat = await Chat.find({
            users:{$in : [userId]}
        })
        console.log('chat:', chat);
        res.status(200).json(chat)
    }catch(err){
        res.status(500).json(err)
    }
}

export const findChat= async (req, res)=>{
    try{
        const chat = await Chat.findOne({
            users: {$all: [req.query.firstId, req.query.secondId]}
        })

        res.status(200).json(chat)
    }catch(err){
        res.status(500).json(err)
    }
}