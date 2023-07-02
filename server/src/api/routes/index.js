import { Router } from "express";
import authRouter from "./auth.route.js";

const mainRoutes = Router();

mainRoutes.use("/auth", authRouter);

export default mainRoutes;
