import { Router } from "express";
import authRouter from "./auth.route.js";
import profileRouter from "./profile.route.js";

const mainRoutes = Router();

mainRoutes.use("/auth", authRouter);
mainRoutes.use("/profile", profileRouter);

export default mainRoutes;
