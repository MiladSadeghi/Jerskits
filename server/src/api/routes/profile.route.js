import { Router } from "express";
import {
  getUserProfile,
  updateUserAvatar,
  updateUserProfile,
} from "../controller/profile.controller.js";
import { verifyJWT } from "../middleware/verifyJWT.js";
import { isAvatarUploaded } from "../middleware/isAvatarUploaded.js";
import uploadAvatar from "../middleware/uploadAvatar.js";

const profileRouter = Router();

profileRouter.use(verifyJWT);
profileRouter.get("/", getUserProfile);
profileRouter.patch("/", updateUserProfile);
profileRouter.put(
  "/profile-avatar",
  uploadAvatar.single("avatar"),
  isAvatarUploaded,
  updateUserAvatar
);

export default profileRouter;
