import mongoose from 'mongoose'

const chatSchema = new mongoose.Schema({
    chatName: {type:String, trim:true},
    isGroupChat: {type:Boolean, default:false},
    users:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User ",
        unique:true
    }],
    latestMessage:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Message",
    },
 
},   
{
    timestamps: true,
});


export default mongoose.models.Chat || mongoose.model("Chat", chatSchema)