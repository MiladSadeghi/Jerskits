import { mongoose } from "mongoose";

const BagItemSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
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
