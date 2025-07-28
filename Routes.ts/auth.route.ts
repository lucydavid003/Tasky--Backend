import { Router } from "express";
import verifyUserInformation from "../Middlewares.ts/verifyUserinformation";
import verifyPasswordStrength from "../Middlewares.ts/erifyPasswordStrength";
import checkUserNameandEmailReuse from "../Middlewares.ts/checkUserNameandEmailReuse";
import { loginUser, registerUser } from "../Controllers.ts/auth.controllers";

const router: Router = Router();

router.post(
  "/register",
  verifyUserInformation,
  checkUserNameandEmailReuse,
  verifyPasswordStrength,
  registerUser
);
router.post("/login", loginUser);

export default router;
