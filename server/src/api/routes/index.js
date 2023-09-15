import { Router } from "express";
import authRouter from "./auth.route.js";
import profileRouter from "./profile.route.js";
import locationRouter from "./location.routes.js";
import userRouter from "./user.route.js";
import landingProvider from "../controller/landing.controller.js";

const mainRoutes = Router();

mainRoutes.use("/auth", authRouter);
mainRoutes.use("/profile", profileRouter);
mainRoutes.use("/location", locationRouter);
mainRoutes.use("/user", userRouter);
mainRoutes.get("/", landingProvider);

export default mainRoutes;
