import { Country, State } from "country-state-city";
import UserModel from "../models/user.model.js";
import { validationResult } from "express-validator";

export const getUserProfile = async (req, res, next) => {
  try {
    const { _id, email, fullName } = req.decoded;
    const findUser = await UserModel.findOne({ _id, email, fullName }).lean();
    if (!findUser) {
      const err = new Error("User not found");
      err.status = 404;
      return next();
    }
    let profile = {
      email: findUser?.email,
      fullName: findUser?.fullName,
      firstName: findUser?.firstName,
      lastName: findUser?.lastName,
      avatar: findUser?.avatar,
      phoneNumber: findUser?.phoneNumber,
      contactEmail: findUser?.contactEmail,
    };

    if (
      findUser.shippingAddress &&
      Object.keys(findUser.shippingAddress).length >= 1
    ) {
      profile.shippingAddress = {
        address: findUser.shippingAddress.address,
        country: {
          value: Country.getCountryByCode(findUser.shippingAddress.country)
            .isoCode,
          label: Country.getCountryByCode(findUser.shippingAddress.country)
            .name,
        },
        state: findUser.shippingAddress.state
          ? {
              value: State.getStateByCodeAndCountry(
                findUser.shippingAddress.state,
                findUser.shippingAddress.country
              ).isoCode,
              label: State.getStateByCodeAndCountry(
                findUser.shippingAddress.state,
                findUser.shippingAddress.country
              ).name,
            }
          : undefined,
        city: findUser.shippingAddress.city
          ? {
              value: findUser.shippingAddress.city,
              label: findUser.shippingAddress.city,
            }
          : undefined,
        postalCode: findUser.shippingAddress.postalCode,
      };
    }
    return res.status(200).json({ error: false, profile });
  } catch (error) {
    console.log(error);
    next();
  }
};

export const updateUserProfile = async (req, res, next) => {
  const {
    firstName,
    lastName,
    contactEmail,
    phoneNumber,
    saveAddress,
    shippingAddress,
  } = req.body;
  const { email, fullName } = req.decoded;

  try {
    const findUser = await UserModel.findOne({ email, fullName });

    if (!findUser) {
      const err = new Error("User not found");
      err.status = 404;
      return next(err);
    }

    let updateOptions = {
      firstName,
      lastName,
      contactEmail,
      phoneNumber,
      ...(saveAddress && {
        shippingAddress: {
          address: shippingAddress?.address,
          postalCode: shippingAddress?.postalCode,
          city: shippingAddress?.city,
          state: shippingAddress?.state,
          country: shippingAddress?.country,
        },
      }),
    };

    const updatedUser = await UserModel.findByIdAndUpdate(
      findUser?._id,
      updateOptions,
      { new: true }
    ).select("-_id -password");

    return res.status(200).json({ profile: updatedUser });
  } catch (error) {
    console.error(error);
    const err = new Error("Server error");
    err.status = 500;
    return next(err);
  }
};

export const updateUserAvatar = async (req, res, next) => {
  const { _id, email, fullName } = req.decoded;

  try {
    const findUser = await UserModel.findOne({
      _id,
      email,
      fullName,
    });
    if (!findUser) {
      const err = new Error("User not found");
      err.status = 404;
      return next();
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      findUser?._id,
      { avatar: req.file?.filename },
      { new: true }
    ).select("avatar");

    return res.status(200).json({ error: false, avatar: updatedUser?.avatar });
  } catch (error) {
    console.error(error);
    const err = new Error("Server error");
    err.status = 500;
    return next(err);
  }
};
