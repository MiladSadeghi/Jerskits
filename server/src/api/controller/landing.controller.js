import ProductModel from "../models/product.model.js";

const landingProvider = async (req, res, next) => {
  try {
    const products = await ProductModel.find();
    const headerProductsId = [
      "64e3d7bf8d4a87d9b5ee29b2",
      "64e65e04b7c149604dc3c79a",
    ];
    const headerProducts = products.filter((product) =>
      headerProductsId.includes(product._id.toString())
    );
    res.status(200).json({ error: false, header: headerProducts });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export default landingProvider;
