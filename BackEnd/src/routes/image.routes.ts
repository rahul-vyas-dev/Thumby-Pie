import { CreateNewImage, EditExistingImage } from "../controllers/Image.controller";
import { Router } from "express";
import { VerifyJWT } from "../middleware/auth.middleware";
import { upload } from "../middleware/multer.middleware";

const router = Router();

router.route("/image/new").post(VerifyJWT, upload.fields([{ name: "UserImage", maxCount: 5 }]), CreateNewImage);
router.route("/image/edit").put(VerifyJWT, EditExistingImage);

export default router;