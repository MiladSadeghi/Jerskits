import mongoose, { Schema } from "mongoose";

const PaymentSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
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
});

const PaymentModel = mongoose.model("Payment", PaymentSchema);

export { PaymentModel, PaymentSchema };
