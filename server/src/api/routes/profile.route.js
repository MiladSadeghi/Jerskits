import { Router } from "express";
import {
  getUserProfile,
  updateUserProfile,
} from "../controller/profile.controller.js";
import { verifyJWT } from "../middleware/verifyJWT.js";
import uploadProfile from "../middleware/uploadProfile.js";

const profileRouter = Router();

profileRouter.use(verifyJWT);
profileRouter.get("/", getUserProfile);
profileRouter.patch("/", uploadProfile.single("profile"), updateUserProfile);

export default profileRouter;
