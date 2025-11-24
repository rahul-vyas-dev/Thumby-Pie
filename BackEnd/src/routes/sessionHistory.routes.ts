import { GetSessionHistory, DeleteSessionChat } from "../controllers/UserSessionHistory.controller";
import { Router } from "express";
import { VerifyJWT } from "../middleware/auth.middleware";
const router = Router();

router.route("/getSessionHistory").post(VerifyJWT, GetSessionHistory);
router.route("/deleteSessionChat").delete(VerifyJWT, DeleteSessionChat);

export default router;