import { Country, State } from "country-state-city";
import UserModel from "../models/user.model.js";
import { validationResult } from "express-validator";

export const getUserProfile = async (req, res, next) => {
  try {
    const { _id, email, fullName } = req.decoded;
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
    let profile;
    if (
      findUser.shippingAddress &&
      Object.keys(findUser.shippingAddress._doc).length >= 1
    ) {
      profile = {
        shippingAddress: {},
      };
      profile.shippingAddress = {
        ...profile.shippingAddress,
        address: findUser.shippingAddress._doc.address,
      };
      const country = Country.getCountryByCode(
        findUser.shippingAddress._doc.country
      );
      profile.shippingAddress = {
        ...profile.shippingAddress,
        country: {
          value: country.isoCode,
          label: country.name,
        },
      };
      if (findUser.shippingAddress._doc.state) {
        const state = State.getStateByCodeAndCountry(
          findUser.shippingAddress._doc.state,
          findUser.shippingAddress._doc.country
        );
        profile.shippingAddress = {
          ...profile.shippingAddress,
          state: {
            value: state.isoCode,
            label: state.name,
          },
        };
      }

      if (findUser.shippingAddress._doc.city) {
        profile.shippingAddress = {
          ...profile.shippingAddress,
          city: {
            value: findUser.shippingAddress._doc.city,
            label: findUser.shippingAddress._doc.city,
          },
        };
      }
      profile.shippingAddress = {
        ...profile.shippingAddress,
        postalCode: findUser.shippingAddress._doc.postalCode,
      };
    }

    profile = {
      ...profile,
      email: findUser?.email,
      fullName: findUser?.fullName,
      firstName: findUser?.firstName,
      lastName: findUser?.lastName,
      avatar: findUser?.avatar,
      phoneNumber: findUser?.phoneNumber,
      paymentMethod: findUser?.paymentMethod,
      contactEmail: findUser?.contactEmail,
    };

    return res.status(200).json({ error: false, profile });
  } catch (error) {
    console.log(error);
    next();
  }
};

export const updateUserProfile = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, contactEmail, phoneNumber } = req.body;
  const { email, fullName } = req.decoded;

  try {
    const findUser = await UserModel.findOne({ email, fullName });

    if (!findUser) {
      const err = new Error("User not found");
      err.status = 404;
      return next(err);
    }

    let updateOptions = {
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(contactEmail && { contactEmail }),
      ...(phoneNumber && { phoneNumber }),
    };

    if (req.body?.saveAddress) {
      const shippingAddress = {
        address: req.body.shippingAddress?.address,
        postalCode: req.body.shippingAddress?.postalCode,
        city: req.body.shippingAddress?.city,
        state: req.body.shippingAddress?.state,
        country: req.body.shippingAddress?.country,
      };
      updateOptions = { ...updateOptions, shippingAddress };
    }

    if (Object.keys(updateOptions).length === 0) {
      return res
        .status(400)
        .json({ error: true, message: "you should change something" });
    }

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
    console.log(findUser);
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
