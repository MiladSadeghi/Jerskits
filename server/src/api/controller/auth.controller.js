import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { validateSignUpBody } from "../../utils/validation.js";
import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const SignUp = [
  validateSignUpBody,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorObj = {};
      errors.array().forEach((error) => {
        errorObj[error.path] = error.msg;
      });
      return res.status(400).json({ errors: errorObj });
    }

    try {
      const { email, password, fullName } = req.body;
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const createUser = await UserModel.create({
        email,
        password: hashedPassword,
        fullName,
      });

      const accessToken = jwt.sign(
        {
          userId: createUser._id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "2h",
        }
      );

      const refreshToken = jwt.sign(
        {
          userId: createUser._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
      );

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.json({ accessToken });
    } catch (error) {
      console.log(error);
      return res.status(406).json({ message: "Invalid credentials" });
    }
  },
];
