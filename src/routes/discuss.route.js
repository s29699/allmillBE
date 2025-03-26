import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { allPost, demodis, registerReply, registerTopic } from "../controllers/discuss/topic.controller.js";

const discussRouter = Router();

discussRouter.route("/create").post(verifyToken, registerTopic);
discussRouter.route("/addreply/:uid").post(verifyToken, registerReply);
discussRouter.route("/allpost").get(allPost);
discussRouter.route("/demodis").get(demodis);


export {discussRouter}