import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";

const showProfile = async (req, res) => {
    const username = req.username;

    const user = await User.findOne({username});

    const post = await Post.find({author:user._id});

    console.log(`All post by user: ${username}: ${post}`);

    return res.status(200).send({
        message:"all post details fetched",
        postTitle
    })

}

export {showProfile}