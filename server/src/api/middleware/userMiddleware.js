import { validationResult } from "express-validator";
import {
  validateAddToBagBody,
  validateProductId,
  validateUpdateQuantity,
  validateUpdateSize,
} from "../../utils/validation.js";

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
    if (!errors.isEmpty()) {
      const formattedErrors = errors.array({ onlyFirstError: true })[0];
      return res
        .status(400)
        .json({ error: true, message: formattedErrors.msg });
    }
    return next();
  },
];

export const validateAddToBag = [
  validateAddToBagBody,
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

export const validateUpdateQuantityBody = [
  validateUpdateQuantity,
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

export const validateUpdateSizeBody = [
  validateUpdateSize,
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
