import { validationResult } from "express-validator";
import { validateSubmitReview } from "../../utils/validation.js";

export const submitReviewErrorHandler = [
  validateSubmitReview,
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const formattedErrors = errors
        .array({ onlyFirstError: true })
        .map((error) => ({
          message: error.msg,
          field: error.path,
        }));
      return res.status(400).json({ errors: formattedErrors });
    }

    next();
  },
];
