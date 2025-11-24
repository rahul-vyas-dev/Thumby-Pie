import { SignIn, SignUp } from "../controllers/User.controller";
import { Router } from "express";
import { validateEmail } from "../middleware/emailValidate.middleware";

const router = Router();

router.route("/signup").post(validateEmail, SignUp);
router.route("/signin").post(SignIn);

export default router;