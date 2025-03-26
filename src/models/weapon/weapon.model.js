import mongoose, { Schema } from 'mongoose';

const weaponSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    dnd:{
        type:String,
        default:"Not Known"
    },
    manufacturer:{
        type:String,
        default:"Not Known"
    },
    description:{
        type:String,
        default:"yeh ek hathiyar hai"
    },
    quantity:{
        type:String,
        default:"0"
    },
    users:[{
        type:String,
        default:"null"
    }],
    type:{
        type:String,
        default:"Not Sure"
    },
    postedby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
})

export const Weapon = mongoose.model("Weapon", weaponSchema);