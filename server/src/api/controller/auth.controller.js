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

      await UserModel.create({
        email,
        password: hashedPassword,
        fullName,
      });

      return res.status(201).json({
        error: false,
        message: "thanks for sign up, now you can sign in!",
      });
    } catch (error) {
      console.log(error);
      if (error.code === 11000) {
        return res.status(409).json({
          error: true,
          message: "An account with that email already exists.",
          field: Object.keys(error.keyValue),
        });
      }
      return next(error);
    }
  },
];

export const SignIn = [
  validateSignInBody,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorObj = {};
      errors.array().forEach((error) => {
        errorObj[error.path] = error.msg;
      });
      return res.status(400).json({ errors: errorObj });
    }

    try {
      const { email, password: bodyPassword } = req.body;
      const foundUser = await UserModel.findOne({
        email,
      });

      if (!foundUser) {
        const error = new Error("");
        error.message =
          "We couldn't find your account. Please check your email and password";
        error.status = 404;
        error.error = true;
        throw error;
      }

      const isPasswordCorrect = await bcrypt.compare(
        bodyPassword,
        foundUser.password
      );

      if (!isPasswordCorrect) {
        const error = new Error("");
        error.message =
          "We couldn't find your account. Please check your email and password";
        error.status = 404;
        error.error = true;
        throw error;
      }

      const { password, __v, createdAt, updatedAt, ...profileData } =
        foundUser._doc;

      const accessToken = jwt.sign(
        {
          _id: profileData._id,
          email: profileData.email,
          fullName: profileData.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "30m",
        }
      );

      const refreshToken = jwt.sign(
        {
          _id: profileData._id,
          email: profileData.email,
          fullName: profileData.fullName,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
      );

      res.cookie("acc", accessToken, {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 60 * 1000,
      });

      res.cookie("ref", refreshToken, {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.json({
        error: false,
        message: "Welcome back!",
        profile: profileData,
      });
    } catch (error) {
      next(error);
    }
  },
];

export const Logout = (req, res) => {
  res.clearCookie("ref");
  res.clearCookie("acc");

  res.status(200).json({ error: false });
};

export const RefreshToken = async (req, res) => {
  const jwtCookie = req.cookies.ref;
  if (!jwtCookie) return res.status(401).json({ error: true });

  try {
    const decodedJWT = jwt.verify(
      jwtCookie,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decode) => {
        if (err) {
          res.clearCookie("acc");
          res.clearCookie("ref");
          return res.status(403).json({ error: true });
        }
        return decode;
      }
    );

    const foundUser = await UserModel.findOne({
      _id: decodedJWT._id,
      email: decodedJWT.email,
      fullName: decodedJWT.fullName,
    });

    const payload = {
      _id: foundUser._id,
      email: foundUser.email,
      fullName: foundUser.fullName,
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "30m",
    });

    res.cookie("acc", accessToken, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 60 * 1000,
    });

    return res.status(200).json({ error: false });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};
