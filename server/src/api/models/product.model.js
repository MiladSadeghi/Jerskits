import { mongoose } from "mongoose";

const ProductSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    enum: ["nike", "adidas", "jordan", "puma", "reebok", "vans"],
    required: true,
  },
  type: {
    type: String,
    enum: ["football", "basketball"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    enum: ["XS", "S", "M", "L", "XL"],
    required: true,
  },
  description: {
    type: String,
  },
});

const ProductModel = mongoose.model("Product", ProductSchema);

export default ProductModel;
