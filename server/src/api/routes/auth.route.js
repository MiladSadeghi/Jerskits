import { Router } from "express";
import {
  Logout,
  SignIn,
  SignUp,
  RefreshToken,
} from "../controller/auth.controller.js";

const authRouter = Router();

authRouter.post("/sign-up", SignUp);
authRouter.post("/sign-in", SignIn);
authRouter.get("/logout", Logout);
authRouter.get("/refresh", RefreshToken);

export default authRouter;
