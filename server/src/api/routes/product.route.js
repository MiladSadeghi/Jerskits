import { Router } from "express";
import { getProducts } from "../controller/product.controller.js";

const productRoute = Router();

productRoute.get("/products", getProducts);

export default productRoute;
