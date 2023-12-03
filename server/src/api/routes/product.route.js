import { Router } from "express";
import {
  getProduct,
  getProducts,
  productSearch,
} from "../controller/product.controller.js";
import { validateProductSearchQuery } from "../middleware/productMiddleware.js";

const productRoute = Router();

productRoute.get("/search", validateProductSearchQuery, productSearch);
productRoute.get("/:slug", getProduct);
productRoute.get("/", getProducts);

export default productRoute;
