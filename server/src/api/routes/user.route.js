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
  submitOrderInformation,
  getOrder,
  createOrder,
  getOrders,
  submitOrderDelivery,
  completeOrder,
  submitOrderPayment,
} from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/verifyJWT.js";
import {
  validateAddToBag,
  validateOrderId,
  validateOrderStepBody,
  validateProductAddition,
  validateProductRemoval,
  validateUpdateQuantityBody,
  validateUpdateSizeBody,
} from "../middleware/userMiddleware.js";
import {
  validateOrderDeliveryBody,
  validateOrderIdFromParam,
  validateOrderInformationBody,
  validateOrderPaymentBody,
} from "../../utils/validation.js";

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

// get user bag
userRouter.get("/bag", getUserBag);
// add product to bag
userRouter.post("/bag", validateAddToBag, addToBag);
// remove product from bag
userRouter.delete("/bag/:productId", validateProductRemoval, removeFromBag);
// update bag item quantity
userRouter.patch(
  "/bag/quantity",
  validateUpdateQuantityBody,
  updateBagItemQuantity
);
// update bag item size
userRouter.patch("/bag/size", validateUpdateSizeBody, updateBagItemSize);

// get all orders
userRouter.get("/orders", getOrders);

// get order by param
userRouter.get("/orders/:orderId", validateOrderId, getOrder);

// create order
userRouter.post("/orders/new", createOrder);

// submit order first step
userRouter.post("/orders/:orderId/information", [
  validateOrderIdFromParam,
  validateOrderInformationBody,
  validateOrderStepBody,
  submitOrderInformation,
]);

// submit order delivery
userRouter.post("/orders/:orderId/delivery", [
  validateOrderIdFromParam,
  validateOrderDeliveryBody,
  validateOrderStepBody,
  submitOrderDelivery,
]);

// submit order payment and end order
userRouter.post("/orders/:orderId/payment", [
  validateOrderIdFromParam,
  validateOrderPaymentBody,
  validateOrderStepBody,
  submitOrderPayment,
  completeOrder,
]);

export default userRouter;
