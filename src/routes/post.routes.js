import { Router } from "express";
import { allPost, createPost, deletePost, displayPost, updatePost } from "../controllers/post.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const postRouter = Router();

postRouter.route("/create").get(verifyToken, createPost);

postRouter.route("/allpost").get(allPost);

postRouter.route("/display/:slug").get(displayPost);

postRouter.route("/delete/:slug").post(deletePost);

postRouter.route("/update/:slug").post(updatePost);


export { postRouter };