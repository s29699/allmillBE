import mongoose , {Schema} from "mongoose";
import slugify from "slugify";

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        // required: true
    },
    slug:{
        type: String,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    lastUpdated: {
        type: Date,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    banned:{
        type:Boolean,
        default:false
    }
},
{
    timestamps:true
}
)



postSchema.pre("save", async function(next) {
    console.log("entered save hook");
    
    if((!this.isModified("title")) && (!this.isModified("hash"))) return next();
    console.log("modification test passed");
    console.log("this.title: ", this.title);
    const slug = slugify(this.title , {lower:true ,strict:true})
    let uniqueSlug = slug;
    let counter = 1;

    while(await Post.findOne({slug:uniqueSlug})){
        uniqueSlug = `${slug}-${counter}`;
        counter++;
    }

    this.slug = uniqueSlug;
    this.lastUpdated = new Date();
    next();
})

export const Post = mongoose.model("Post", postSchema);