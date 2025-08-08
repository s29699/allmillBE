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
    
    const { uid} = req.params;
    console.log("uid: ", uid);
    const parent = await Topic.findOne({uuid:uid}); 
    console.log("parent", parent);
    const {replyVal} = req.body;
    const post = replyVal;
    console.log("post", post);
    const usr = req.username;
    console.log("username", usr);

    const hashedTopic = generateHash(post);
    const isCopied = await Topic.findOne({hash:hashedTopic})

    console.log("isCopied", isCopied);
    if(isCopied){
        return res.status(403).send({
            message:"there exists a same post"
        })
    }

    const user = await User.findOne({username:usr.username});
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

const allPost = async (req, res) => {
    console.log("aaya");
    const posts = await Topic.find({}).populate('writer')
    // console.log("posts: ",posts);
    return res.status(201).send({
        message:"All posts",
        posts
    })
}

//Display one post
const onePost = async (req, res) => {
    const {uuid} = req.params;
    console.log("uuid of onePost to display", uuid);

    if(!uuid){
        return res.status(301).send({
            message:"Empty uuid recieved. Failed..."
        })
    }
    const topic = await Topic.findOne({uuid});

    if(!topic){
        return res.status(402).send({
            message:"Error: Unale to fetch the tweet from DB."
        })
    }

    return res.status(201).send({
        message:"The tweet is fetched",
        topic
    })
}

const fetchReplies = async (req, res) => {
    const {uuid} = req.params;
    console.log("uuid of tweet whse reply is fetched", uuid);
    if(!uuid){
        return res.status(401).send({
            message:"uuid of topic/tweet is empty"
        })
    }
    
    const tweet = await Topic.findOne({uuid});
    if(!tweet){
        return res.status(402).send({
            message:"Error fetching tweet whose replies are required"
        })
    }

    // console.log("tweet", tweet);
    // console.log("tweet._id", tweet._id);

    const replies = await Topic.find({repliesTo:tweet._id}).populate('writer')
    if(!replies){
        return res.status(402).send({
            message:"Error fetching the replies"
        })
    }

    return res.status(201).send({
        message:"The replies for this tweet",
        replies
    })
}

const demodis = (req, res) => (res.send("It worked"));
export {registerTopic, demodis, registerReply, allPost, onePost, fetchReplies}