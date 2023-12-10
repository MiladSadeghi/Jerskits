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
    email: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const DeliverySchema = Schema(
  {
    arriveTime: {
      type: String,
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
    currentStep: {
      type: Number,
      default: 0,
      validate: {
        validator: async function (value) {
          // Validate currentStep based on different steps of the order process
          if (value === 1) return this.information !== undefined;
          if (value === 2) return this.delivery !== undefined;
          if (value === 3) return this.payment !== undefined;

          if (value <= 3) {
            const count = await this.constructor.countDocuments({
              user: this.user,
              currentStep: { $lte: 3, $ne: this.currentStep },
            });
            return count === 0;
          }

          return true;
        },
        message:
          "Invalid currentStep value or non-unique user for currentStep <= 4",
      },
    },
  },
  { timestamps: true }
);

OrderSchema.index(
  { user: 1 },
  { unique: true, partialFilterExpression: { currentStep: { $lte: 3 } } }
);

OrderSchema.pre("save", function (next) {
  if (this.isModified("information")) this.currentStep = 1;
  if (this.isModified("delivery")) this.currentStep = 2;
  if (this.isModified("payment")) this.currentStep = 3;
  next();
});

const OrderModel = mongoose.model("Order", OrderSchema);

export default OrderModel;
