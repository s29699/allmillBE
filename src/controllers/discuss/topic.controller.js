import crypto from 'crypto'
import { Topic } from '../../models/discuss/topic.model.js';
import { User } from '../../models/blog/user.model.js';
import {v4 as uuidv4} from 'uuid';

const generateHash = (description) => {
    const hashed = crypto.createHash('sha256');
    hashed.update(description);
    return hashed.digest('hex');
}

const registerTopic = async (req, res) => {
    const {post} = req.body;
    console.log("post: ", post);
    

    // const user_id = req.uid;

    const ud = req.username;
    console.log("username: ", ud);

    const hashedTopic = generateHash(post);
    const isCopied = await Topic.findOne({hash:hashedTopic})

    if(isCopied){
        return res.status(403).send({
            message:"there exists a same post"
        })
    }
   
    const user = await User.findOne({username:ud.username});
    // console.log("user: ",user._id);

    const uuid = uuidv4();

    const topic = new Topic({
        post,
        uuid,
        hash:hashedTopic,
        writer:user._id,
    })

    await topic.save();

    if(!topic){
        return res.status(300).send({
            message:"Error creating post"
        })
    }

    return res.status(201).send({
        message:"Post created",
        topic
    })
}

const registerReply = async (req, res) => {
    // const alias = req.url.split('/');
    // const uid = alias[alias.length - 1];
    console.log("enter register reply");
    
    const {uid} = req.params;
    // console.log("uid: ", uid);
    const parent = await Topic.findOne({uuid:uid}); 
    
    const {post} = req.body;

    const username = req.username;

    const hashedTopic = generateHash(post);
    const isCopied = await Topic.findOne({hash:hashedTopic})

    if(isCopied){
        return res.status(403).send({
            message:"there exists a same post"
        })
    }

    const user = await User.findOne({username});
    console.log("user: ",user._id);

    const uuid = uuidv4();

    const topic = new Topic({
        post,
        uuid,
        hash:hashedTopic,
        writer:user._id,
        repliesTo:parent._id
    })
    await topic.save();

    if(!topic){
        return res.status(300).send({
            message:"Error creating post"
        })
    }

    return res.status(201).send({
        message:"Reply  added",
        topic
    })
}

const allPost = async (req,res) => {
    console.log("aaya");
    const posts = await Topic.find({}).populate('writer')
    // console.log("posts: ",posts);
    return res.status(201).send({
        message:"All posts",
        posts
    })
}



const demodis = (req, res) => (res.send("It worked"));
export {registerTopic, demodis, registerReply, allPost}