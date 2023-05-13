import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    senderId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    content:{type:String, trim:true},
    chatId:{type: mongoose.Schema.Types.ObjectId, ref:'Chat'}
}, {timestamps:true})

export default mongoose.models.Message || mongoose.model("Message", messageSchema) 