import { Post } from "../models/blog/post.model.js";
import { User } from "../models/blog/user.model.js";

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
    const {username} = req.params();
    console.log("username in getUserPost", username);

    const user = await User.findOne({username});
    const post = await Post.find({author:user._id});

    console.log("all post by user:", post);

    return res.status(201).send({
        message:`all post by ${user.username}`,
        post
    })
}

export {showProfile, getUserPost}