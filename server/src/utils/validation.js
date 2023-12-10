import { check, body, param, query } from "express-validator";
import { City, State } from "country-state-city";

export const validateSignUpBody = [
  check("email")
    .isEmail()
    .withMessage("Email is required and must be a valid email address"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password is required and must be at least 6 characters long"),
  check("fullName").not().isEmpty().withMessage("Full Name is required"),
];

export const validateSignInBody = [
  check("email")
    .isEmail()
    .withMessage("Email is required and must be a valid email address"),
  check("password").not().isEmpty().withMessage("Password is required"),
];

export const validateUpdateProfile = [
  body("firstName")
    .optional()
    .isLength({ min: 3 })
    .withMessage("First name is to short!"),
  body("lastName")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Last name is to short!"),
  body("contactEmail")
    .optional()
    .isEmail()
    .withMessage("Must be a valid email"),
  body("phoneNumber")
    .optional()
    .isMobilePhone("any")
    .withMessage("Must be a valid phone number"),
  body("saveAddress")
    .isBoolean()
    .custom((value) => {
      if (value) {
        return [
          body("body.shippingAddress.address", "Address").notEmpty(),
          body("body.shippingAddress.city", "City")
            .notEmpty()
            .custom((value, { req }) => {
              if (
                City.getCitiesOfState(
                  req.body.shippingAddress.country,
                  req.body.shippingAddress.state
                ).length !== 0
              ) {
                return true;
              } else {
                return !!value;
              }
            }),
          body("body.shippingAddress.state", "State").custom(
            (value, { req }) => {
              if (
                State.getStatesOfCountry(req.body.shippingAddress.country)
                  .length !== 0
              ) {
                return true;
              } else {
                return !!value;
              }
            }
          ),
          body("body.shippingAddress.country", "Country").notEmpty().bail(),
          body("body.shippingAddress.postalCode", "Postal code").notEmpty(),
        ];
      }
      return [];
    }),
];

export const validateUpdateUserAvatar = [
  body("avatar").custom((value, { req }) => {
    if (!req.file) {
      throw new Error("Avatar image is required.");
    }
    return true;
  }),
];

export const validateSubmitReview = [
  check("text")
    .notEmpty()
    .withMessage("Comment text is required and must be a non-empty string"),

  check("rating")
    .notEmpty()
    .withMessage("Rating is required")
    .isNumeric()
    .withMessage("Rating must be a number")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),
];

export const validateProductId = (path) => {
  if (path === "body") {
    return [
      body("productId")
        .isString()
        .withMessage("Invalid product ID format")
        .isMongoId()
        .withMessage("Invalid product ID")
        .notEmpty()
        .withMessage("Product ID is required"),
    ];
  } else {
    return [
      param("productId")
        .isString()
        .withMessage("Invalid product ID format")
        .isMongoId()
        .withMessage("Invalid product ID")
        .notEmpty()
        .withMessage("Product ID is required"),
    ];
  }
};

export const validateAddToBagBody = [
  body("productId")
    .isString()
    .withMessage("Invalid product ID format")
    .isMongoId()
    .withMessage("Invalid product ID")
    .notEmpty()
    .withMessage("Product ID is required"),
  body("size").isString().withMessage("Size is required"),
];

export const validateUpdateQuantity = [
  body("productId")
    .isString()
    .withMessage("Invalid product ID format")
    .isMongoId()
    .withMessage("Invalid product ID")
    .notEmpty()
    .withMessage("Product ID is required"),
  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 1 })
    .withMessage("Quantity must be a number"),
];

export const validateUpdateSize = [
  body("productId")
    .isString()
    .withMessage("Invalid product ID format")
    .isMongoId()
    .withMessage("Invalid product ID")
    .notEmpty()
    .withMessage("Product ID is required"),
  body("newSize")
    .isString()
    .withMessage("Invalid new size format")
    .notEmpty()
    .withMessage("New size is required"),
];

export const validateSearchQuery = [
  query("q").notEmpty().withMessage("Search query is required"),
];

export const validateOrderIdFromParam = [
  param("orderId")
    .notEmpty()
    .withMessage("Order ID is required")
    .isNumeric()
    .withMessage("Invalid order ID, must be a number")
    .isLength({ min: 6, max: 6 })
    .withMessage("Invalid order ID, must be a 6-digit number"),
];

export const validateOrderInformationBody = [
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("address").notEmpty().withMessage("Address is required"),
  body("country").notEmpty().withMessage("Country is required"),
  body("state").notEmpty().withMessage("State is required"),
  body("city").notEmpty().withMessage("City is required"),
  body("postalCode")
    .notEmpty()
    .withMessage("Postal code is required")
    .isPostalCode("any"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),
  body("phoneNumber")
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone("any"),
  body("save").optional().toBoolean(),
];

export const validateOrderDeliveryBody = [
  body("arriveTime")
    .notEmpty()
    .withMessage("Arrive time is required")
    .isISO8601()
    .toDate()
    .withMessage("Invalid date format"),
];

export const validateOrderPaymentBody = [
  body("nameOnCard")
    .notEmpty()
    .withMessage("Name on card is required")
    .isString()
    .isLength({ min: 5 })
    .withMessage("Name on card must be at least 5 characters long"),
  body("cardNumber")
    .notEmpty()
    .withMessage("Card number is required")
    .isCreditCard()
    .withMessage("Invalid card number")
    .isLength({ min: 16, max: 16 })
    .withMessage("Invalid card number")
    .isNumeric()
    .withMessage("Invalid card number")
    .isInt({ min: 1000000000000000, max: 9999999999999999n })
    .withMessage("Invalid card number"),
  body("expirationDate")
    .notEmpty()
    .withMessage("Expiration date is required")
    .isISO8601()
    .toDate()
    .withMessage("Invalid date format"),
  body("cvv")
    .notEmpty()
    .withMessage("CVV is required")
    .isNumeric()
    .withMessage("Invalid CVV")
    .isLength({ min: 3, max: 3 })
    .withMessage("Invalid CVV"),
  body("save").optional().toBoolean(),
];
