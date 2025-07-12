import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { 
    filterUser, 
    signInUser, 
    signUpUser, 
    updateUser 
} from "../controllers/user.controller";

const router = Router();

router.route("/signup").post(signUpUser);
router.route("/signin").post(signInUser);

router.use(verifyJWT);
router.route("/update").put(updateUser);
router.route("/bulk").get(filterUser);

export default router;