import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import {
  validateSignInBody,
  validateSignUpBody,
} from "../../utils/validation.js";
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
      return res.status(201).json({ accessToken });
    } catch (error) {
			console.log(error);
      if (error.code === 11000) {
        return res.status(409).json({
          error: true,
          message: "An account with that email already exists.",
          field: Object.keys(error.keyValue),
        });
      }
      return res.status(406).json({ message: "Invalid credentials" });
    }
  },
];

export const SignIn = [
  validateSignInBody,
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
      const { email, password } = req.body;

      const foundUser = await UserModel.findOne({
        email,
      });

      if (!foundUser) {
        return res.status(404).json({
          error: true,
          message:
            "We couldn't find your account. Please check your email and password",
        });
      }

      const isPasswordCorrect = await bcrypt.compare(
        password,
        foundUser.password
      );
      if (!isPasswordCorrect) {
        return res.status(404).json({
          error: true,
          message:
            "We couldn't find your account. Please check your email and password",
        });
      }

      const accessToken = jwt.sign(
        {
          userId: foundUser._id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "2h",
        }
      );

      const refreshToken = jwt.sign(
        {
          userId: foundUser._id,
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

export const Logout = (req, res) => {
  res.clearCookie("access_token");
  return res.sendStatus(200);
};
