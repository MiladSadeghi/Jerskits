import { Router } from "express";
import { SignUp } from "../controller/auth.controller.js";

const authRouter = Router();

authRouter.post("/sign-up", SignUp);

export default authRouter;
