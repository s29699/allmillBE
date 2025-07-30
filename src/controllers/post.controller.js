import { Post } from "../models/blog/post.model.js";
import { User } from "../models/blog/user.model.js";
import crypto from 'crypto';

const generateHash = (description) => {
    const hashed = crypto.createHash('sha256');
    hashed.update(description);
    return hashed.digest('hex');
}

const createPost = async (req, res) => {
    const {title, description} = req.body;
    console.log("req.url: ", req.url);
    console.log("title & description", title, description );
    
    console.log("tyeof(description): ",typeof(description));

    const username = req.username;
    console.log("username: ", username);

    const user = await User.findOne({username});
    console.log("user: ",user._id);
    if(! user.isMember){
        return res.status(403).send({
            message: "User ia not member. Post can't be created"
        })
    }

    const hashedDescription = generateHash(description);

    const isCopied = await Post.findOne({hash:hashedDescription});

    console.log("isCopied: ", isCopied);

    if(isCopied != null){
        return res.status(403).send({
            message:"There exist a same post"
        })
    }
    
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
    console.log("all post called")
    const {pageno} = req.params;
    const pn = parseInt(pageno);
    const allposts = await Post.find({}).limit(pn*9).skip((pn-1)*9);
    if(!allposts){
        return res.status(501).send({
            message:"error in fetching all posts",
        })
    }
    // console.log("allposts: ", allposts);
    
    return res.status(200).send({
        message:"All posts fetched",
        allposts
    })
}

const displayPost = async (req, res) => {
    // const alias = req.url.split('/');
    // const slug = alias[alias.length - 1];
    
    const {slug} = req.params;  
    console.log("slug in display: ",slug);
    // the below check didn't worked. Don't know why
    // if(slug == undefined){
    //     return res.status(401).send({
    //         message:"Post can't be displayed."
    //     })
    // }
    const post = await Post.findOne({slug:slug});
    // console.log("post", post);
    if(post == null){
        return res.status(402).send({
            message:"Wrong Request"
        })
    }
    const user = await User.findOne({_id:post.author})
    return res.status(201).send({
        message:"your post",
        post,
        user
    })
}

const deletePost = async (req, res) => {
    // const url = req.url.split('/');
    // const slug = url[url.length -1];
    const {slug} = req.params;
    console.log("slug in delete: ",slug);
    const isDeleted = await Post.deleteOne({slug:slug});
    if(!isDeleted) return res.status(501).send({message:"unable to delete"});

    return res.status(201).send({message:"Post deleted successfully"});
}

const updatePost = async (req, res) => {
    // const url = req.url.split('/');
    // const slug = url[url.length -1];
    const username = req.username;
    const user = await User.findOne({username});
    
    // Author is membership expire ho gayi, phir author should be allowed to update the post. hence commented
    // if(user.isMember){
    //     return res.status(403).send({
    //         message:"user is not a memner. Can't modify post"
    //     })
    // }
    const {slug} = req.params;
    
    console.log("slug in update:", slug );

    const {title, description} = req.body;

    const post = await Post.findOne({slug:slug});
    // console.log("post.author", post.author);
    // console.log("user-id", user._id);
    //objectId compare ke liye ya to toString se convert karke === karo ya niche wala method
    if(!post.author.equals(user._id) ){
        return res.status(401).send({
            message:"You are not author."
        })
    }
    post.title = title;
    post.description = description;
    console.log("post in update: ",post);
    // const newPost = await Post.findByIdAndUpdate(post._id,
    //     {title:title, description:description},
    //     {new:true}
    // )
    const hookResponse = await post.save();

    console.log("hookResponse: ", hookResponse);

    const updatedPost = await Post.findById(post._id,{
        new:true
    });

    return res.status(201).send({
        message:"updated successfully",
        updatedPost
    })
}

const searchPost = async (req, res) => {
    const { searchInput } = req.body;
    console.log(typeof(searchInput), searchInput);
    
    const post = await Post.findOne({title:searchInput});
    console.log("post in searchInput: ", post);

    if(!post){
        return res.status(304).send({
            message:"No post with such title"
        })
    }

    return res.status(201).send({
        message:"Post found",
        post
    })
}

export { createPost, allPost, displayPost, deletePost, updatePost, searchPost }