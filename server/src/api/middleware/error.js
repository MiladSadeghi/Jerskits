import HttpStatus from "http-status";
import { ValidationError } from "express-validation";
import APIError from "../errors/api-error.js";

export const handler = (err, req, res, next) => {
  const response = {
    code: err.status,
    message: err.message || HttpStatus[err.status],
    errors: err.errors,
    stack: err.stack,
  };

  if (process.env.NODE_ENV !== "development") {
    delete response.stack;
  }

  res.status(err.status);
  res.json(response);
};

export const converter = (err, req, res, next) => {
  let convertedError = err;

  if (err instanceof ValidationError) {
    convertedError = new APIError({
      message: "Validation Error",
      errors: err.errors,
      status: err.status,
      stack: err.stack,
    });
  } else if (!(err instanceof APIError)) {
    convertedError = new APIError({
      message: err.message,
      status: err.status,
      stack: err.stack,
    });
  }

  return handler(convertedError, req, res);
};

export const notFound = (req, res, next) => {
  const err = new APIError({
    message: "Not found",
    status: HttpStatus.NOT_FOUND,
  });
  return handler(err, req, res);
};
