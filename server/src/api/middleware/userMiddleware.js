import { validationResult } from "express-validator";
import { validateProductId } from "../../utils/validation.js";

export const validateProductAddition = [
  validateProductId("body"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = errors.array({ onlyFirstError: true })[0];
      return res
        .status(400)
        .json({ error: true, message: formattedErrors.msg });
    }
    return next();
  },
];

export const validateProductRemoval = [
  validateProductId("param"),
  (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      const formattedErrors = errors.array({ onlyFirstError: true })[0];
      return res
        .status(400)
        .json({ error: true, message: formattedErrors.msg });
    }
    return next();
  },
];
