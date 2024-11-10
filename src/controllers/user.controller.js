import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = async (req, res) => {
    const {username, email, fullName, password} = req.body ;
    console.log("req.body", req.body);

    const tf = (ele) => (ele.trim === "")

    if([username, email, fullName, password].some(tf)){
        throw new ApiError(400, "Both field are required")
    }

    const isUserExisting = await User.findOne(
        { $or:[{username, email}] }
    )

    if(isUserExisting){throw new ApiError(400, "Some/All credentials are already used")}
    
    const hashedPassword = await bcrypt.hash(password, 5);

    const user = await User.create({
        fullName,
        email,
        username,
        password:hashedPassword,
        lastUpd
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser){throw new ApiError(501, "Issue in creating user in DB")}

    console.log("created User", createdUser);

    return res.status(201).json(
        new ApiResponse(200, createdUser, "user registered")
    )
};


const loginUser = async (req, res) => {
    const {username, password} = req.body;
    
    if([username,password].some((ele)=>(ele.trim === ""))){
        console.log("Enter without space");
    }

    const user = await User.findOne({username}) ;

    if(!user){ throw new ApiError(400, "Some/All credentials are already used")}

    const isMatch = await bcrypt.compare(password, user.password) ;

    if(!isMatch){
        throw new ApiError(400, "Some/All credentials are already used")
    }

    const token = jwt.sign(username, process.env.ACCESS_TOKEN_SECRET)

    if(!token){
        return res.status(500).json(
            new ApiResponse(500,"error in token creation")
        )
    }

    return res.status(201).json(
        new ApiResponse(200, token, "user logged in")
    )
}

const logoutUser = async (req, res) => {
    // const token = req.header("Authorization")?.replace("Bearer ", "");
    // const token = req.get("Authorization")?.replace("Bearer ", "");
    const token = req.headers.authorization.replace("Bearer ","");
    console.log("token",token);
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,decodedToken) => {
        if(err){
            return res.status(402).send({
                message:"Not authorized",
                err
            });
        }
        res.status(200).send({
            message:"Authorized",
            decodedToken
        })
    });
    // if(decodedToken){
    //     res.status(200).send({
    //         message:"Authorized"
    //     })
    // }
    // else{
    //     res.status(400).send({
    //         message:"Not Authorized"
    //     })
    // }
}

const demo = (req, res) => (res.send("It worked"));
const demo2 = (req, res) => {
    const headerToken = req.headers.token;
    
    const isTokenCorrect = jwt.verify(headerToken, process.env.ACCESS_TOKEN_SECRET);
    if(!isTokenCorrect){
        throw new ApiError(400, "Wrong token");
    }

    return res.status(201).json(
        new ApiResponse(200, isTokenCorrect, "token verified")
    )
}


export {registerUser, demo, loginUser, demo2, logoutUser}