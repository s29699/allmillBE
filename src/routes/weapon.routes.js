import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { addWeapon, allweapon } from "../controllers/weapon/weapon.controller.js";

const weaponRouter = Router();

weaponRouter.route("/addweapon").post(verifyToken, addWeapon);

weaponRouter.route("/allweapon/air").get(allweapon);
weaponRouter.route("/allweapon/water").post(allweapon);
weaponRouter.route("/allweapon/land").post(allweapon);
weaponRouter.route("/allweapon/space").post(allweapon);



export default weaponRouter