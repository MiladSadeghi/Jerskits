import ProductModel from "../models/product.model.js";

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
      perPage = 6,
    } = req.query;

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

    let sortBy = "createdAt";
    let sortDirection = 1;

    if (sort === "first") {
      sortBy = "createdAt";
      sortDirection = 1;
    } else if (sort === "last") {
      sortBy = "createdAt";
      sortDirection = -1;
    } else if (sort === "lowprice") {
      sortBy = "price";
      sortDirection = 1;
    } else if (sort === "highprice") {
      sortBy = "price";
      sortDirection = -1;
    }

    const skip = (page - 1) * perPage;
    const products = await ProductModel.find(query)
      .sort({ [sortBy]: sortDirection })
      .skip(skip)
      .limit(perPage);

    const totalProductsCount = await ProductModel.countDocuments(query);
    const totalPages = Math.ceil(totalProductsCount / perPage);

    return res.json({
      error: false,
      products,
      totalPages,
      currentPage: Number(page),
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
