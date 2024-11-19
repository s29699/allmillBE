import { Router } from "express";
import { allPost, createPost, deletePost, displayPost, searchPost, updatePost } from "../controllers/post.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const postRouter = Router();

postRouter.route("/create").post(verifyToken, createPost);

postRouter.route("/allpost/:pageno").get(allPost);

postRouter.route("/display/:slug").get(displayPost);

postRouter.route("/delete/:slug").post(verifyToken, deletePost);

postRouter.route("/update/:slug").post(verifyToken, updatePost);

postRouter.route("/search").post(searchPost);

export { postRouter };