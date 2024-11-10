import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import crypto from 'crypto';

const generateHash = (description) => {
    const hashed = crypto.createHash('sha256');
    hashed.update(description);
    return hashed.digest('hex');
}

const createPost = async (req, res) => {
    const {title, description} = req.body;
    console.log("req.url: ", req.url);

    const username = req.username;

    console.log("username : ", username);
    
    const hashedDescription = generateHash(description);

    const isCopied = await Post.findOne({hash:hashedDescription});

    console.log("isCopied: ", isCopied);

    if(isCopied != null){
        return res.status(403).send({
            message:"There exist a same post"
        })
    }
    const user = await User.findOne({username});
    console.log("user: ",user._id);
    
    if(!user){
        return res.status(501).send({
            message:"couldn't fetch the user from database"
        })
    }
    
    const post = new Post({
        title,
        description,
        hash:hashedDescription,
        author:user._id,
        lastUpdated: new Date(),
    })

    // console.log("post before save hook called: ", post);
    await post.save();

    const checkingPost = await Post.findById(post._id);

    if(!checkingPost){
        return res.status(200).send({message:"Error in post creation"})
    }

    console.log("post: ", checkingPost);
    

    return res.status(200).send({
        message:"Post Created",
        post
    })
    
}


const allPost = async (req, res) => {
    const allposts = await Post.find({});
    if(!allposts){
        return res.status(501).send({
            message:"error in fetching all posts",
        })
    }
    console.log("allposts: ", allposts);
    
    return res.status(200).send({
        message:"All osts fetched",
        allposts
    })
}

const displayPost = async (req, res) => {
    const alias = req.url.split('/');
    const slug = alias[alias.length - 1];

    const post = await Post.findOne({slug:slug});

    return res.status(201).send({
        message:"your post",
        post
    })
}

const deletePost = async (req, res) => {
    const url = req.url.split('/');
    const slug = url[url.length -1];
    console.log("slug: ",slug);
    const isDeleted = await Post.deleteOne({slug:slug});
    if(!isDeleted) return res.status(501).send({message:"unable to delete"});

    return res.status(201).send({message:"Post deleted successfully"});
}

const updatePost = async (req, res) => {
    const url = req.url.split('/');
    const slug = url[url.length -1];

    const {title, description} = req.body;

    const post = await Post.findOne({slug});
    post.title = title;
    post.description = description;
    const hookResponse = await post.save();

    console.log("hookResponse: ", hookResponse);

    const updatedPost = await Post.findById(post._id);

    return res.status(201).send({
        message:"updated successfully",
        updatedPost
    })
}

export { createPost, allPost, displayPost, deletePost, updatePost }