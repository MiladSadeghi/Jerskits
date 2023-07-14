import UserModel from "../models/user.model.js";

export const getUserProfile = async (req, res, next) => {
  try {
    const { email, username } = req.decoded;
    const findUser = await UserModel.findOne({ email, fullName: username });
    if (!findUser) {
      const err = new Error("User not found");
      err.status = 404;
      return next();
    }
    const profile = {
      email: findUser.email,
      fullName: findUser.fullName,
      firstName: findUser.firstName,
      lastName: findUser.lastName,
      shippingAddress: findUser.shippingAddress,
      avatar: findUser.avatar,
      phoneNumber: findUser.phoneNumber,
      paymentMethod: findUser.paymentMethod,
    };
    return res.status(200).json({ error: false, profile });
  } catch (error) {
    console.log(error);
    next();
  }
};

export const updateUserProfile = async (req, res, next) => {
  const { email, username } = req.decoded;
  const { body } = req;

  try {
    const findUser = await UserModel.findOne({ email, fullName: username });
    if (!findUser) {
      const err = new Error("User not found");
      err.status = 404;
      return next();
    }

    const updateOptions = {
      ...(body.firstName && { firstName: body.firstName }),
      ...(body.lastName && { lastName: body.lastName }),
      ...(body.address && {
        shippingAddress: { address: body.address },
      }),
      ...(body.postalCode && {
        shippingAddress: { postalCode: body.postalCode },
      }),
      ...(body.city && {
        shippingAddress: { city: body.city },
      }),
      ...(body.state && {
        shippingAddress: { state: body.state },
      }),
      ...(body.country && {
        shippingAddress: { country: body.country },
      }),
      ...(body.contactEmail && {
        shippingAddress: { contactEmail: body.contactEmail },
      }),
      ...(body.phoneNumber && {
        shippingAddress: { phoneNumber: body.phoneNumber },
      }),
      ...(req.file && {
        avatar: req.file.filename,
      }),
    };

    const updatedUser = await UserModel.findByIdAndUpdate(
      findUser._id,
      updateOptions,
      { new: true }
    ).select("-_id -password");

    return res.status(200).json({ profile: updatedUser });
  } catch (error) {
    console.log(error);
    const err = new Error();
    err.status = 500;
    return next(err);
  }
};
