import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { allPost, demodis, fetchReplies, onePost, registerReply, registerTopic } from "../controllers/discuss/topic.controller.js";

const discussRouter = Router();

discussRouter.route("/create").post(verifyToken, registerTopic);
discussRouter.route("/addreply/:uid").post(verifyToken, registerReply);
discussRouter.route("/fetchreply/:uuid").get(fetchReplies)
// discussRouter.route("/addreply/:uid").post(registerReply);
discussRouter.route("/allpost").get(allPost);
discussRouter.route("/:uuid").get(onePost);
discussRouter.route("/demodis").get(demodis);


export {discussRouter}