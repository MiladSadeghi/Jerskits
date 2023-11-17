import { Router } from "express";
import {
  addToFavorites,
  getUserFavorites,
  getUser,
  removeProductFromFavorites,
} from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/verifyJWT.js";
import {
  validateProductAddition,
  validateProductRemoval,
} from "../middleware/userMiddleware.js";

const userRouter = Router();

userRouter.use(verifyJWT);
userRouter.get("/", getUser);
// add product to a user's favorites
userRouter.post("/favorites", validateProductAddition, addToFavorites);
// get user's favorites
userRouter.get("/favorites", getUserFavorites);
// remove product from a user's favorites
userRouter.delete(
  "/favorites/:productId",
  validateProductRemoval,
  removeProductFromFavorites
);

export default userRouter;
