import { Router } from "express";
import { getUser } from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

const userRouter = Router();

userRouter.use(verifyJWT);
userRouter.get("/", getUser);

export default userRouter;
