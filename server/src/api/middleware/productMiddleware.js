import { validationResult } from "express-validator";
import { validateSearchQuery } from "../../utils/validation.js";

export const validateProductSearchQuery = [
  validateSearchQuery,
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
