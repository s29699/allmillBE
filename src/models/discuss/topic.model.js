import mongoose, {Schema} from "mongoose";
import {v4 as uuidv4} from 'uuid';

const topicSchema = new Schema({
    post:{
        type:String,
        required: false
    },
    uuid:{
        type:String,
        default: uuidv4
    },
    hash:{
        type:String
    },
    writer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    repliesTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Topic",
        default: null
    }
})

export const Topic = mongoose.model("Topic", topicSchema);