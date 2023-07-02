import { Router } from "express";
import { Logout, SignIn, SignUp } from "../controller/auth.controller.js";

const authRouter = Router();

authRouter.post("/sign-up", SignUp);
authRouter.post("/sign-in", SignIn);
authRouter.post("/logout", Logout);

export default authRouter;
