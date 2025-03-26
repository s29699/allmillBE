import mongoose, { Schema } from "mongoose";

const replySchema = new Schema({
    reply:{
        type:String,
        required:false,
    },
    repliedto:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Topic",
        required:true
    }
})

export const Reply = mongoose.model("Reply", replySchema);