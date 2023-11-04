import { check, body } from "express-validator";
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
