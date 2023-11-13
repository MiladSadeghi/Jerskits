import ProductModel from "../models/product.model.js";
import ReviewModel from "../models/review.model.js";

export const submitReview = async (req, res, next) => {
  const { _id } = req.decoded;
  const { text, rating } = req.body;
  const { productSlug } = req.params;
  try {
    const product = await ProductModel.findOne({ slug: productSlug });
    if (!product) {
      const err = new Error("Product not found");
      err.status = 404;
      return next(err);
    }

    const newReview = new ReviewModel({
      user: _id,
      text,
      rating,
      productId: product._id,
    });

    await newReview.save();

    return res
      .status(200)
      .json({ error: false, message: "Review submitted", newReview });
  } catch (error) {
    console.log(error);
    const err = new Error("Server error");
    err.status = 500;
    return next(err);
  }
};

export const getProductReviews = async (req, res, next) => {
  const { productSlug } = req.params;
  try {
    const product = await ProductModel.findOne({ slug: productSlug }).select(
      "_id"
    );
    if (!product) {
      const err = new Error("Product not found");
      err.status = 404;
      return next(err);
    }

    const reviews = await ReviewModel.find({ productId: product._id });

    return res.status(200).json({ error: false, reviews });
  } catch (error) {
    console.log(error);
    const err = new Error("Server error");
    err.status = 500;
    return next(err);
  }
};
