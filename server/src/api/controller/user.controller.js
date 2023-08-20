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
    return res.status(200).json({ error: false, profile: foundedUser });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};
