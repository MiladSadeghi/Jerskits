import { Router } from "express";
import {
  addToFavorites,
  getUserFavorites,
  getUser,
  removeProductFromFavorites,
  addToBag,
  getUserBag,
  removeFromBag,
  updateBagItemQuantity,
  updateBagItemSize,
} from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/verifyJWT.js";
import {
  validateAddToBag,
  validateProductAddition,
  validateProductRemoval,
  validateUpdateQuantityBody,
  validateUpdateSizeBody,
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

userRouter.get("/bag", getUserBag);
userRouter.post("/bag", validateAddToBag, addToBag);
userRouter.delete("/bag/:productId", validateProductRemoval, removeFromBag);
userRouter.patch(
  "/bag/quantity",
  validateUpdateQuantityBody,
  updateBagItemQuantity
);

userRouter.patch("/bag/size", validateUpdateSizeBody, updateBagItemSize);

export default userRouter;
