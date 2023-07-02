import { check } from "express-validator";

export const validateSignUpBody = [
  check("email")
    .isEmail()
    .withMessage("Email is required and must be a valid email address"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password is required and must be at least 6 characters long"),
  check("fullName").not().isEmpty().withMessage("Full Name is required"),
];
