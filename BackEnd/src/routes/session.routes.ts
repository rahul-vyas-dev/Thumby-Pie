import { VerifyJWT } from "../middleware/auth.middleware";
import { Router } from "express";
import { GetUserAllSession, DeleteSingleSession, EditSessionTitle, DeleteAllSession, CreateNewSession, } from "../controllers/Session.controller";

const router = Router();

router.use(VerifyJWT);

router.route("/get-user-sessions").get(GetUserAllSession);
router.route("/delete-single-session").delete(DeleteSingleSession);
router.route("/edit-session-title").put(EditSessionTitle);
router.route("/delete-all-sessions").delete(DeleteAllSession);
router.route("/create-new-session").post(CreateNewSession);

export default router;