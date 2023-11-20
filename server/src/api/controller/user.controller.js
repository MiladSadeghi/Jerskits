import FavoriteModel from "../models/favorite.model.js";
import ProductModel from "../models/product.model.js";
import UserModel from "../models/user.model.js";

export const getUser = async (req, res, next) => {
  try {
    const { _id, email, fullName } = req.decoded;
    const foundedUser = await UserModel.findOne({
      _id,
      email,
      fullName,
    })
      .select("-_id -password -__v -createdAt -updatedAt")
      .populate("shippingAddress");
    if (!foundedUser) {
      const err = new Error("User not found");
      err.status = 404;
      return next();
    }

    const favoritesList = await FavoriteModel.findOne({ user: _id }).populate(
      "favorites"
    );
    return res.status(200).json({
      error: false,
      profile: foundedUser,
      favorites: favoritesList.favorites,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

export const getUserFavorites = async (req, res, next) => {
  try {
    const favoritesList =
      (await FavoriteModel.findOne({
        user: req.decoded._id,
      }).populate("favorites")) || [];

    return res
      .status(200)
      .json({ error: false, favorites: favoritesList.favorites });
  } catch (error) {
    console.log(error);
    const err = new Error("Server error");
    err.status = 500;
    return next(err);
  }
};

export const addToFavorites = async (req, res, next) => {
  const { _id } = req.decoded;
  const { productId } = req.body;
  try {
    const product = await ProductModel.findById({ _id: productId });
    if (!product) {
      const err = new Error("Product not found");
      err.status = 404;
      return next(err);
    }

    const userFavoritesList = await FavoriteModel.findOne({ user: _id });

    if (!userFavoritesList) {
      const newFavoritesList = new FavoriteModel({
        user: _id,
        favorites: [productId],
      });

      await newFavoritesList.save();
    } else if (!userFavoritesList.favorites.includes(productId)) {
      userFavoritesList.favorites.push(productId);

      await userFavoritesList.save();
    } else {
      const err = new Error("Product already added to favorites");
      err.status = 409;
      return next(err);
    }

    return res
      .status(200)
      .json({ error: false, message: "Product added to favorites" });
  } catch (error) {
    console.log(error);
    const err = new Error("Server error");
    err.status = 500;
    return next(err);
  }
};

export const removeProductFromFavorites = async (req, res, next) => {
  try {
    const { _id } = req.decoded;
    const { productId } = req.params;
    console.log(productId);

    const userFavorites = await FavoriteModel.findOneAndUpdate(
      { user: _id },
      { $pull: { favorites: productId } },
      { new: true }
    );

    console.log(userFavorites);

    if (
      !userFavorites ||
      !userFavorites.favorites ||
      userFavorites.favorites.indexOf(productId) === -1
    ) {
      return res.status(404).json({
        message: "Product not found in favorites",
      });
    }

    return res
      .status(200)
      .json({ error: false, message: "Product removed from favorites" });
  } catch (error) {
    console.log(error);
    const err = new Error("Server error");
    err.status = 500;
    return next(err);
  }
};
