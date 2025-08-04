import { Post } from "../models/blog/post.model.js";
import { User } from "../models/blog/user.model.js";
import { Topic } from "../models/discuss/topic.model.js";

const showProfile = async (req, res) => {
    const {username} = req.params;

    const user = await User.findOne({username});

    // const post = await Post.find({author:user._id});

    // console.log(`All post by user: ${username}: ${post}`);

    return res.status(200).send({
        message:"user details fetched",
        user
    })

}

const getUserPost = async (req, res) => {
    const {username} = req.params;
    console.log("username in getUserPost", req.params);

    const user  = await User.findOne({username});
    console.log("user", user);
    // const user = await User.findOne({usrname});
    const post = await Post.find({author:user._id});

    console.log("all post by user:", post);

    return res.status(201).send({
        message:`all post by ${username}`,
        post
    })
}

const getUserTweet = async (req,res) => {
    const {username} = req.params;
    const user = await User.findOne({username});
    const tweet = await Topic.find({writer:user._id})
    console.log("all tweets by user ${username}", tweet);

    return res.status(201).send({
        message:`all post by ${username}`,
        tweet 
    })
}

export {showProfile, getUserPost, getUserTweet}