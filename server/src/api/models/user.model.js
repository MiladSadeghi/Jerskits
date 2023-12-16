import { mongoose } from "mongoose";

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
    saveAddress: {
      type: Boolean,
      required: true,
    },
    address: String,
    postalCode: Number,
    city: String,
    state: String,
    country: String,
    firstName: String,
    lastName: String,
    avatar: String,
    phoneNumber: Number,
    contactEmail: String,
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
