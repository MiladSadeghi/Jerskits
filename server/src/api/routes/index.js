import { Router } from "express";
import authRouter from "./auth.route.js";
import profileRouter from "./profile.route.js";
import locationRouter from "./location.routes.js";
import userRouter from "./user.route.js";
import {
  kidCollectionProvider,
  landingProvider,
} from "../controller/landing.controller.js";
import { isUserSignIn } from "../middleware/verifyJWT.js";
import productRoute from "./product.route.js";

const mainRoutes = Router();

mainRoutes.use("/auth", authRouter);
mainRoutes.use("/profile", profileRouter);
mainRoutes.use("/location", locationRouter);
mainRoutes.use("/user", userRouter);
mainRoutes.use("/", isUserSignIn, productRoute);
mainRoutes.get("/", isUserSignIn, landingProvider);
mainRoutes.get("/kid-collection/:brand?", isUserSignIn, kidCollectionProvider);

export default mainRoutes;
