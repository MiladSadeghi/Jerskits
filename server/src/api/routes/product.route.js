import { Router } from "express";
import { getProduct, getProducts } from "../controller/product.controller.js";

const productRoute = Router();

productRoute.get("/", getProducts);
productRoute.get("/:slug", getProduct);

export default productRoute;
