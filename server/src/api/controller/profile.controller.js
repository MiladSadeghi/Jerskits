import { City, Country, State } from "country-state-city";
import UserModel from "../models/user.model.js";

export const getUserProfile = async (req, res, next) => {
  try {
    const { _id, email, fullName } = req.decoded;
    const user = await UserModel.findOne({ _id, email, fullName })
      .select("-_id -password -__v")
      .lean();

    if (!user) {
      return res.status(404).json({ error: true, message: "User not found" });
    }

    if (user?.country) {
      const country = Country.getCountryByCode(user?.country);
      user.country = {
        label: country.name,
        value: country.isoCode,
      };
    }

    if (user?.state) {
      const state = State.getStateByCodeAndCountry(
        user?.state,
        user?.country.value
      );
      user.state = {
        label: state.name,
        value: state.isoCode,
      };
    }

    if (user?.city) {
      const city = City.getCityByCode(
        user?.country.value,
        user?.state.value,
        user?.city
      );
      user.city = {
        label: city.name,
        value: city.isoCode,
      };
    }

    const profile = {
      firstName: user?.firstName,
      lastName: user?.lastName,
      contactEmail: user?.contactEmail,
      phoneNumber: user?.phoneNumber,
      address: user?.address,
      postalCode: user?.postalCode,
      city: user?.city,
      state: user?.state,
      country: user?.country,
      avatar: user?.avatar,
      saveAddress: user?.saveAddress,
    };
    return res.status(200).json({ error: false, profile });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, message: "Server error" });
  }
};

export const updateUserProfile = async (req, res, next) => {
  const {
    firstName,
    lastName,
    contactEmail,
    phoneNumber,
    saveAddress = false,
    address,
    postalCode,
    city,
    state,
    country,
  } = req.body;
  const { _id, email, fullName } = req.decoded;

  try {
    if (country) {
      const isCountryExist = Country.getCountryByCode(country);
      if (!isCountryExist) {
        return res
          .status(400)
          .json({ error: true, message: "Country not found" });
      }
    }

    if (state) {
      const isStateExist = State.getStateByCode(country, state);
      if (!isStateExist) {
        return res
          .status(400)
          .json({ error: true, message: "State not found" });
      }
    }

    if (city) {
      const isCityExist = City.getCitiesOfState(countryCode, stateCode).filter(
        (city) => city.name === city
      );
      if (!isCityExist) {
        return res.status(400).json({ error: true, message: "City not found" });
      }
    }

    const updatedUser = {
      firstName,
      lastName,
      contactEmail,
      phoneNumber,
      address,
      postalCode,
      city,
      state,
      country,
      saveAddress,
    };

    const updateUserProfile = await UserModel.findByIdAndUpdate(
      { _id, email, fullName },
      updatedUser,
      { new: true }
    ).select("-_id -password -__v");

    if (!updateUserProfile) {
      return res.status(404).json({ error: true, message: "User not found" });
    }

    return res.status(200).json({ profile: updateUserProfile });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: true, message: "Server error" });
  }
};

export const updateUserAvatar = async (req, res, next) => {
  const { _id, email, fullName } = req.decoded;
  const avatar = req.file?.filename;

  try {
    const findUser = await UserModel.findByIdAndUpdate(
      {
        _id,
        email,
        fullName,
      },
      { avatar }
    ).select("-_id -password -__v");

    if (!findUser) {
      console.error(error);
      return res.status(404).json({ error: true, message: "User not found" });
    }

    return res.status(200).json({ error: false, avatar });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: true, message: "Server error" });
  }
};
