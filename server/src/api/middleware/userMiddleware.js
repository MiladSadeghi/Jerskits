import { validationResult } from "express-validator";
import {
  validateAddToBagBody,
  validateOrderIdFromParam,
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

export const validateOrderId = [
  validateOrderIdFromParam,
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

export const validateCheckoutStepBody = (validations) => {
  return async (req, res, next) => {
    const errorObj = {};
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors[0]) {
        errorObj[result.errors[0].path] = result.errors[0].msg;
      }
    }

    if (Object.keys(errorObj).length === 0) {
      return next();
    }

    return res.status(400).json({ errors: errorObj });
  };
};

export const validateSubmitOrderBody = (validations, step, errorMsg) => {
  return async (req, res, next) => {
    const errorObj = {};
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors[0]) {
        errorObj[result.errors[0].path.split(".")[1]] = result.errors[0].msg;
      }
    }

    if (Object.keys(errorObj).length === 0) {
      return next();
    }

    return res.status(400).json({
      error: true,
      step,
      message: errorMsg,
      errors: errorObj,
    });
  };
};
