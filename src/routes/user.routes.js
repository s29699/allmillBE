import { Router } from "express";
// import { upload } from "../middlewares/multer.middleware.js";
import { demo, demo2, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { showProfile } from "../controllers/profile.js";

const userRouter = Router();

// router.route("/register").post(
//     upload.fields([
//         {
//             name: "profileImage",
//             maxCount: 1
//         }
//     ]),
//     registerUser
// )

userRouter.route("/register").post(registerUser) ;
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(logoutUser);
userRouter.route("/postbyuser").get(verifyToken, showProfile);

userRouter.route("/demo").get(verifyToken,demo);
userRouter.route("/d2").get(demo2);

export default userRouter;