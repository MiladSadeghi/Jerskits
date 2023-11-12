import { Router } from "express";
import {
  getProductReviews,
  submitReview,
} from "../controller/review.controller.js";
import { verifyJWT } from "../middleware/verifyJWT.js";
import { submitReviewErrorHandler } from "../middleware/reviewErrorHandler.js";

const reviewRoute = Router();

reviewRoute.post(
  "/:productSlug",
  verifyJWT,
  submitReviewErrorHandler,
  submitReview
);
reviewRoute.get("/:productSlug", getProductReviews);

export default reviewRoute;
