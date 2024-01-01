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
  getOrder,
  getOrders,
  submitOrder,
  validateCheckout,
  validateInformationCheckout,
} from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/verifyJWT.js";
import {
  validateAddToBag,
  validateCheckoutStepBody,
  validateOrderId,
  validateProductAddition,
  validateProductRemoval,
  validateSubmitOrderBody,
  validateUpdateQuantityBody,
  validateUpdateSizeBody,
} from "../middleware/userMiddleware.js";
import {
  validateCheckoutDeliveryBody,
  validateCheckoutInformation,
  validateCheckoutPaymentBody,
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

// validate checkout information
userRouter.post(
  "/checkout/validate/information",
  validateCheckoutStepBody(validateCheckoutInformation()),
  validateInformationCheckout
);

// validate checkout delivery
userRouter.post(
  "/checkout/validate/delivery",
  validateCheckoutStepBody(validateCheckoutDeliveryBody()),
  validateCheckout
);

// validate checkout payment
userRouter.post(
  "/checkout/validate/payment",
  validateCheckoutStepBody(validateCheckoutPaymentBody()),
  validateCheckout
);

userRouter.post(
  "/orders",
  validateSubmitOrderBody(
    validateCheckoutInformation("information"),
    1,
    "Please complete order information!"
  ),
  validateSubmitOrderBody(
    validateCheckoutDeliveryBody("delivery"),
    2,
    "Please choose a delivery time"
  ),
  validateSubmitOrderBody(
    validateCheckoutPaymentBody("payment"),
    4,
    "Please check your payment"
  ),
  submitOrder
);

export default userRouter;
