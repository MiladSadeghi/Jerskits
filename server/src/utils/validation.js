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

export const validateCheckoutInformation = (field = "") => {
  let fieldName = field ? `${field}.` : "";
  return [
    body(`${fieldName}firstName`)
      .notEmpty()
      .withMessage("First name is required"),
    body(`${fieldName}lastName`)
      .notEmpty()
      .withMessage("Last name is required"),
    body(`${fieldName}address`).notEmpty().withMessage("Address is required"),
    body(`${fieldName}country`).notEmpty().withMessage("Country is required"),
    body(`${fieldName}state`).notEmpty().withMessage("State is required"),
    body(`${fieldName}city`).notEmpty().withMessage("City is required"),
    body(`${fieldName}postalCode`)
      .exists()
      .withMessage("Postal code is required")
      .isPostalCode("any"),
    body(`${fieldName}contactEmail`)
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email"),
    body(`${fieldName}phoneNumber`)
      .exists()
      .withMessage("Phone number is required")
      .isMobilePhone("any"),
    body(`${fieldName}saveAddress`).optional().toBoolean().default(false),
  ];
};

export const validateCheckoutDeliveryBody = (field = "") => {
  let fieldName = field ? `${field}.` : "";
  return [
    check(`${fieldName}arriveTime`)
      .exists({ checkFalsy: true })
      .withMessage("Delivery arrival time is required.")
      .bail()
      .isISO8601()
      .withMessage("Invalid date format.")
      .bail()
      .custom((value) => {
        const date = new Date(value);
        if (date <= new Date()) {
          throw new Error("Delivery arrival time must be a future date.");
        }
        return true;
      }),

    check(`${fieldName}type`)
      .exists()
      .withMessage("Delivery type is required.")
      .isIn(["standard", "express"])
      .withMessage("Invalid delivery type selected."),

    check(`${fieldName}price`)
      .exists()
      .withMessage("Delivery price is required.")
      .isNumeric()
      .withMessage("Delivery price must be a number.")
      .custom((value, { req }) => {
        if (
          value === 10 &&
          (req.body.type || req.body.delivery.type) === "standard"
        ) {
          return true;
        } else if (
          value === 20 &&
          (req.body.type || req.body.delivery.type) === "express"
        ) {
          return true;
        } else {
          throw new Error("Delivery price does not match delivery type.");
        }
      }),
  ];
};

export const validateCheckoutPaymentBody = (field = "") => {
  let fieldName = field ? `${field}.` : "";
  return [
    body(`${fieldName}nameOnCard`)
      .notEmpty()
      .withMessage("Name on card is required")
      .isString()
      .withMessage("Name on card must be a string")
      .isLength({ min: 5 })
      .withMessage("Name on card must be at least 5 characters long"),

    body(`${fieldName}cardNumber`)
      .notEmpty()
      .withMessage("Card number is required")
      .isCreditCard()
      .withMessage("Invalid card number"),

    body(`${fieldName}expirationDate`)
      .notEmpty()
      .withMessage("Expiration date is required")
      .matches(/^(0[1-9]|1[0-2])\/(20[2-9][0-9])$/)
      .withMessage("Expiration date is not valid. Format must be MM/YYYY")
      .custom((value) => {
        const [month, year] = value.split("/").map((v) => parseInt(v, 10));
        const currentDate = new Date();
        const expDate = new Date(year, month);
        if (currentDate >= expDate) {
          throw new Error("Card is expired");
        }
        return true;
      }),

    body(`${fieldName}cvv`)
      .notEmpty()
      .withMessage("CVV is required")
      .isNumeric()
      .withMessage("CVV must be numeric")
      .isLength({ min: 3, max: 4 })
      .withMessage("Invalid CVV"),

    body(`${fieldName}savePayment`).optional().isBoolean().toBoolean(),
  ];
};
