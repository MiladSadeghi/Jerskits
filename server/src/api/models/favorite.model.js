import mongoose from "mongoose";

const FavoriteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

const FavoriteModel = mongoose.model("Favorite", FavoriteSchema);

export default FavoriteModel;
