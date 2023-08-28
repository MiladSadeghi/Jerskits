import { mongoose } from "mongoose";

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    enum: ["nike", "adidas", "jordan"],
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
  offPrice: {
    type: Number,
  },
  gender: {
    type: String,
    enum: ["men", "women", "kid"],
    required: true,
  },
  color: [
    {
      type: String,
      required: true,
    },
  ],
  size: [
    {
      type: String,
      enum: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    },
  ],
  slug: {
    type: String,
    required: true,
  },
  gallery: [
    {
      type: String,
      required: true,
    },
  ],
  poster: {
    type: String,
    required: false,
  },
  detail_product: {
    type: [
      {
        _id: false,
        title: String,
        description: {
          type: String,
          required: false,
          default: undefined,
        },
        specification: {
          type: [String],
          required: false,
          default: undefined,
        },
      },
    ],
    default: undefined,
  },
});

const ProductModel = mongoose.model("Product", ProductSchema);

export default ProductModel;
