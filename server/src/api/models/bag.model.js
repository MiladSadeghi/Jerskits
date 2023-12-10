import { mongoose } from "mongoose";

export const BagItemSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, "Quantity can not be less then 1."],
  },
  price: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

const BagSchema = mongoose.Schema(
  {
    items: [BagItemSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    subTotal: {
      default: 0,
      type: Number,
    },
  },
  { timestamps: true }
);

const BagModel = mongoose.model("Bag", BagSchema);

export default BagModel;
