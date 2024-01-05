import { City, Country, State } from "country-state-city";
import { generateOrderNumber } from "../../utils/utility.js";
import BagModel from "../models/bag.model.js";
import FavoriteModel from "../models/favorite.model.js";
import OrderModel from "../models/order.model.js";
import ProductModel from "../models/product.model.js";
import UserModel from "../models/user.model.js";

export const getUser = async (req, res, next) => {
  try {
    const { _id, email, fullName } = req.decoded;
    const user = await UserModel.findOne({
      _id,
      email,
      fullName,
    }).select("-_id -password -__v");
    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      return next();
    }

    const favoritesList = await FavoriteModel.findOne({ user: _id }).populate(
      "favorites"
    );

    const userBag = await BagModel.find({ user: _id }).populate(
      "items.product"
    );

    const userOrders = await OrderModel.findOne({ user: _id }).populate(
      "orderItems.items.product"
    );

    return res.status(200).json({
      error: false,
      profile: user,
      favorites: favoritesList.favorites,
      bag: userBag[0],
      orders: userOrders,
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

    return res.status(200).json({
      error: false,
      message: "Product added to favorites",
      product,
    });
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

    const userFavorites = await FavoriteModel.findOneAndUpdate(
      { user: _id },
      { $pull: { favorites: productId } },
      { new: true }
    );

    if (!userFavorites || !userFavorites.favorites) {
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

export const getUserBag = async (req, res, next) => {
  try {
    const userBag = await BagModel.findOne({
      user: req.decoded._id,
    }).populate("items.product");
    return res.status(200).json({ error: false, bag: userBag });
  } catch (error) {
    console.log(error);
    const err = new Error("Server error");
    err.status = 500;
    return next(err);
  }
};

export const addToBag = async (req, res, next) => {
  const { _id } = req.decoded;
  const { productId, size } = req.body;
  try {
    const product = await ProductModel.findById({ _id: productId });
    if (!product) {
      const err = new Error("Product not found");
      err.status = 404;
      return next(err);
    }

    let userBag = await BagModel.findOne({ user: _id });

    if (!product.size.includes(size)) {
      return res.status(400).json({
        error: true,
        message: "Size not available for this product",
      });
    }

    if (userBag) {
      const existingProductIndex = userBag?.items?.some((item) =>
        item.product.equals(productId)
      );

      if (existingProductIndex) {
        return res.status(400).json({
          error: true,
          message: "Product already exists in the bag",
        });
      }
    }

    if (!userBag) {
      userBag = await new BagModel({
        user: _id,
        items: [],
      });
    }

    userBag.items.push({
      product: productId,
      quantity: 1,
      price: product.offPrice !== 0 ? product.offPrice : product.price,
      size,
      total: product.offPrice !== 0 ? product.offPrice : product.price,
    });
    userBag.subTotal +=
      product.offPrice !== 0 ? product.offPrice : product.price;

    await userBag.save();

    const populatedBag = await userBag.populate("items.product");

    return res.status(200).json({
      error: false,
      message: "Product added to bag",
      bag: populatedBag,
    });
  } catch (error) {
    console.log(error);
    const err = new Error("Server error");
    err.status = 500;
    return next(err);
  }
};

export const removeFromBag = async (req, res, next) => {
  const { _id } = req.decoded;
  const { productId } = req.params;

  try {
    let userBag = await BagModel.findOne({ user: _id }).populate(
      "items.product"
    );

    if (!userBag) {
      return res.status(400).json({
        error: true,
        message: "Bag not found for the user",
      });
    }

    const existingProductIndex = userBag.items.findIndex((item) =>
      item.product.equals(productId)
    );

    if (existingProductIndex === -1) {
      return res.status(400).json({
        error: true,
        message: "Product not found in the bag",
      });
    }

    const removedProduct = userBag.items.splice(existingProductIndex, 1)[0];

    userBag.subTotal -= (
      (removedProduct.product.offPrice !== 0
        ? removedProduct.product.offPrice
        : removedProduct.product.price) * removedProduct.quantity
    ).toFixed(2);

    await userBag.save();

    const populatedBag = await userBag.populate("items.product");

    return res.status(200).json({
      error: false,
      message: "Product removed from bag",
      bag: populatedBag,
    });
  } catch (error) {
    console.error(error);
    const err = new Error("Server error");
    err.status = 500;
    return next(err);
  }
};

export const updateBagItemQuantity = async (req, res, next) => {
  const { _id } = req.decoded;
  const { productId, quantity } = req.body;

  try {
    let userBag = await BagModel.findOne({ user: _id }).populate(
      "items.product"
    );

    if (!userBag) {
      return res.status(400).json({
        error: true,
        message: "Bag not found for the user",
      });
    }

    const existingProduct = userBag.items.find((item) =>
      item.product.equals(productId)
    );

    if (!existingProduct) {
      return res.status(400).json({
        error: true,
        message: "Product not found in the bag",
      });
    }

    existingProduct.quantity = quantity;
    existingProduct.total = (
      quantity *
      (existingProduct.product.offPrice !== 0
        ? existingProduct.product.offPrice
        : existingProduct.product.price)
    ).toFixed(2);
    userBag.subTotal = userBag.items.reduce(
      (total, item) => total + item.total,
      0
    );

    await userBag.save();

    userBag = await BagModel.findOne({ user: _id }).populate("items.product");

    return res.status(200).json({
      error: false,
      bag: userBag,
    });
  } catch (error) {
    console.error(error);
    const err = new Error("Server error");
    err.status = 500;
    return next(err);
  }
};

export const updateBagItemSize = async (req, res, next) => {
  const { _id } = req.decoded;
  const { productId, newSize } = req.body;

  try {
    let userBag = await BagModel.findOne({ user: _id }).populate(
      "items.product"
    );

    if (!userBag) {
      return res.status(400).json({
        error: true,
        message: "Bag not found for the user",
      });
    }

    const existingProduct = userBag.items.find((item) =>
      item.product.equals(productId)
    );

    if (!existingProduct) {
      return res.status(400).json({
        error: true,
        message: "Product not found in the bag",
      });
    }

    if (!existingProduct.product.size.includes(newSize)) {
      return res.status(400).json({
        error: true,
        message: `${newSize} is not available for this product`,
      });
    }

    existingProduct.size = newSize;

    await userBag.save();

    userBag = await BagModel.findOne({ user: _id }).populate("items.product");

    return res.status(200).json({
      error: false,
      bag: userBag,
    });
  } catch (error) {
    console.error(error);
    const err = new Error("Server error");
    err.status = 500;
    return next(err);
  }
};

export const getOrder = async (req, res, next) => {
  const { _id: userId } = req.decoded;
  const { orderId } = req.params;

  try {
    let userOrder = await OrderModel.findOne({
      orderNumber: orderId,
      user: userId,
    });
    if (!userOrder) {
      return res.status(400).json({
        error: true,
        message: "Order not found",
      });
    }
    return res.status(200).json({
      error: false,
      order: userOrder,
    });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Server error" });
  }
};

export const getOrders = async (req, res, next) => {
  const { _id: userId } = req.decoded;
  try {
    const orders = await OrderModel.find({ user: userId });
    const currentDate = new Date();
    const categorizedOrders = orders.reduce(
      (acc, order) => {
        const orderCategory =
          order.delivery.arriveTime < currentDate ? "history" : "ongoing";
        acc[orderCategory].push(order);
        return acc;
      },
      { history: [], ongoing: [] }
    );
    return res.status(200).json({
      error: false,
      orders: categorizedOrders,
    });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Server error" });
  }
};

export const validateInformationCheckout = (req, res, next) => {
  try {
    let country = Country.getCountryByCode(req.body.country);
    let state = State.getStateByCodeAndCountry(req.body.state, country.isoCode);
    let city = City.getCitiesOfState(country.isoCode, state.isoCode).find(
      (city) => city.name === req.body.city
    );

    country = {
      label: country.name,
      value: country.isoCode,
    };

    state = {
      label: state.name,
      value: state.isoCode,
    };

    city = {
      label: city.name,
      value: city.name,
    };

    return res.status(200).json({ ...req.body, country, state, city });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, message: "Server error" });
  }
};

export const validateCheckout = (req, res, next) => {
  try {
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, message: "Server error" });
  }
};

export const submitOrder = async (req, res, next) => {
  const { _id: userId } = req.decoded;
  const { information, delivery, payment } = req.body;

  try {
    const orderNumber = generateOrderNumber();
    const order = new OrderModel({
      user: userId,
      information,
      delivery,
      payment,
      orderNumber,
    });

    const userBag = await BagModel.findOne({ user: userId });

    if (!userBag) {
      return res.status(400).json({
        error: true,
        message: "Bag not found for the user",
      });
    }

    if (userBag.items.length === 0) {
      return res.status(400).json({
        error: true,
        message: "Bag is empty",
      });
    }

    order.orderItems = {
      subTotal: userBag.subTotal,
      items: userBag.items,
      price: userBag.subTotal + delivery.price + 90,
    };

    await BagModel.findOneAndDelete({ _id: userBag._id });
    await order.save();

    return res.status(201).json({ error: false, orderId: orderNumber });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, message: "Server error" });
  }
};
