import mongoose, {Schema} from "mongoose";

const commentSchema = new Schema({
    response:{
        type:String,
        required: false
    },
    commentedon:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Topic",
        required:true
    }
})