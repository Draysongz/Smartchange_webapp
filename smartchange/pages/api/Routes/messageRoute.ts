import Message from '../Model/messageModel'

connectDB()
export const addMessage = async(req, res)=>{
    const {chatId, senderId, content} = req.body
    const message = new Message({
        chatId,
        senderId,
        content
    })

    try{
        const result = await message.save()
        res.status(200).json(result)
    }catch(err){
        res.status(500).json(err)
    }
}


export const getMessages =  async(req,res)=>{
    const chatId = req.query.chatId
    try{
        const result = await Message.find({chatId})
        res.status(200).json(result)

    }catch(err){
    res.status(500).json(err)
    }
}