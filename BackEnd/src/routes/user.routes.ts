import { SignIn, SignUp, verifyCode } from "../controllers/User.controller";
import { Router } from "express";
import { validateEmail } from "../middleware/emailValidate.middleware";

const router = Router();

router.route("/signup").post(validateEmail, SignUp);
router.route("/signin").post(SignIn);
router.route("/verify-code").post(verifyCode);

export default router;