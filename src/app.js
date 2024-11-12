//express work
import express from "express";
import userRouter from "./routes/user.routes.js";
import { postRouter } from "./routes/post.routes.js";
import cors from "cors";

const app = express();

// app.use(cors())

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true
}))

//so that express can handle json data. previously body-parser was used for this but express can do it on its own
app.use(express.json())
//toread encoded url like +,%20 and so on
// app.use(express.urlencoded({extended: true, limit:"16kb"}))
//to store some file like pdf,favicon etc
// app.use(express.static("public"))
//to set and unset cookie on browser
// app.use(cookieParser())

app.use("/api/v1/users", userRouter)

app.use("/api/v1/posts", postRouter)

export {app} ;