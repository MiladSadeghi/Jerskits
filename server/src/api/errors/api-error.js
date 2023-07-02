import HttpStatus from "http-status";
import ExtendableError from "./extandable-error.js";

class APIError extends ExtendableError {
  constructor({
    message,
    errors,
    stack,
    status = HttpStatus.INTERNAL_SERVER_ERROR,
    isPublic = false,
  }) {
    super({
      message,
      errors,
      status,
      isPublic,
      stack,
    });
  }
}

export default APIError;
