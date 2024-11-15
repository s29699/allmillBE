import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js';

function verifyToken (req,res,next) {
    // const token = req.header("Authorization")?.replace("Bearer ", "");
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken)=>{
        if(err){
            return res.status(401).send({
                message:"Not authenticated"
            })
        }
        // const username = decodedToken.username;
         
        User.findOne({decodedToken}).then(
            () => {req.username = decodedToken; console.log(req.username); next();},
            (err) => {console.log(err)}
        )
        // req.userId = user._id;
        // next();
    })
}

export {verifyToken}