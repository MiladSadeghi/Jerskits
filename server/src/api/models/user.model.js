import { mongoose } from "mongoose";

const AddressSchema = new mongoose.Schema({
  address: String,
  postalCode: String,
  city: String,
  state: String,
  country: String,
});

const PaymentMethodSchema = new mongoose.Schema({
  provider: String,
  cardLastFour: String,
  expirationDate: String,
});

const UserSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: String,
    lastName: String,
    shippingAddress: AddressSchema,
    avatar: String,
    phoneNumber: Number,
    paymentMethod: PaymentMethodSchema,
    contactEmail: String,
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
