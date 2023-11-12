import ProductModel from "../models/product.model.js";
import ReviewModel from "../models/review.model.js";

export const getProducts = async (req, res, next) => {
  try {
    const {
      minPrice,
      maxPrice,
      color,
      size,
      brand,
      type,
      sort,
      page = 1,
      gender,
    } = req.query;

    const perPage = 6;
    const query = {};

    if (minPrice) {
      query.price = query.price || {};
      query.price.$gte = parseFloat(minPrice);
    }

    if (maxPrice) {
      query.price = query.price || {};
      query.price.$lte = parseFloat(maxPrice);
    }

    if (color) {
      const colorArray = Array.isArray(color) ? color : [color];
      query.color = { $in: colorArray.map((c) => new RegExp(c, "i")) };
    }

    if (size) {
      const sizeArray = Array.isArray(size) ? size : [size];
      query.size = { $in: sizeArray.map((s) => new RegExp(s, "i")) };
    }

    if (brand) {
      query.brand = brand;
    }

    if (type) {
      query.type = type;
    }

    if (gender) {
      query.gender = gender;
    }

    let sortBy = "createdAt";
    let sortDirection = 1;

    if (sort === "relevance") {
      sortBy = "createdAt";
      sortDirection = 1;
    } else if (sort === "new arrivals") {
      sortBy = "createdAt";
      sortDirection = -1;
    } else if (sort === "price:low") {
      sortBy = "price";
      sortDirection = 1;
    } else if (sort === "price:high") {
      sortBy = "price";
      sortDirection = -1;
    }

    const skip = (page - 1) * perPage;
    const aggregateResult = await ProductModel.aggregate([
      { $match: query },
      { $sort: { [sortBy]: sortDirection } },
      { $skip: skip },
      { $limit: perPage },
      {
        $group: {
          _id: null,
          products: { $push: "$$ROOT" },
          highestPrice: {
            $max: {
              $cond: [
                {
                  $eq: ["$brand", brand],
                  $eq: ["$color", color],
                  $eq: ["$size", size],
                  $eq: ["$type", type],
                },
                "$price",
                "$$ROOT.price",
              ],
            },
          },
        },
      },
    ]);

    const highestPriceAggregate = await ProductModel.aggregate([
      { $match: query },
      { $sort: { [sortBy]: sortDirection } },
      {
        $group: {
          _id: undefined,
          highestPrice: { $max: "$price" },
        },
      },
    ]);

    const totalProductsCount = await ProductModel.countDocuments(query);
    const totalPages = Math.ceil(totalProductsCount / perPage);
    const { products } = aggregateResult[0];
    const { highestPrice } = highestPriceAggregate[0];

    return res.json({
      error: false,
      products: products,
      totalPages,
      currentPage: Number(page),
      highestPrice: highestPrice,
    });
  } catch (error) {
    console.log(error);
    const err = new Error("Server error");
    err.status = 500;
    return next(err);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const product = await ProductModel.findOne({ slug });
    if (!product) {
      return res.status(404).json({
        error: true,
        message:
          "Unfortunately, we couldn't locate the product you were looking for.",
      });
    }

    const reviews = await ReviewModel.find({ productId: product._id }).populate(
      "user",
      "-_id firstName lastName fullName avatar"
    );

    return res.status(200).json({ error: false, product, reviews });
  } catch (error) {
    console.log(error);
    const err = new Error("Server error");
    err.status = 500;
    return next(err);
  }
};
