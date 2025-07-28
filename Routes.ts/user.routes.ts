import { Router } from "express";
import verifyUser from "../Middlewares.ts/verifyUser";
import { updateUserInfo, updateUserPassword ,getUserProfile} from "../Controllers.ts/user.controllers";

const router: Router = Router();

router.patch("/", verifyUser, updateUserInfo);
router.patch("/password", verifyUser,updateUserPassword)
router.get("/me", verifyUser,getUserProfile)



export default router;