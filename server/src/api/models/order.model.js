import mongoose, { Schema } from "mongoose";
import { PaymentSchema } from "./payment.model.js";
import { BagItemSchema } from "./bag.model.js";

const informationSchema = Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    postalCode: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    contactEmail: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const DeliverySchema = Schema(
  {
    arriveTime: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      enum: ["standard", "express"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const PaymentWithOutUserSchema = Schema(
  {
    nameOnCard: {
      type: String,
      required: true,
    },
    cardNumber: {
      type: Number,
      required: true,
    },
    expirationDate: {
      type: String,
      required: true,
    },
    cvv: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const OrderItemSchema = Schema(
  {
    items: [BagItemSchema],
    subTotal: {
      default: 0,
      type: Number,
    },
  },
  { _id: false }
);

const OrderSchema = Schema(
  {
    orderNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    information: {
      type: informationSchema,
    },
    delivery: {
      type: DeliverySchema,
    },
    payment: {
      type: PaymentWithOutUserSchema,
    },
    orderItems: {
      type: OrderItemSchema,
    },
    price: {
      type: Number,
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("Order", OrderSchema);

export default OrderModel;
