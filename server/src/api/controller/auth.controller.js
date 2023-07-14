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
          email: createUser.email,
          username: createUser.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "2h",
        }
      );

      const refreshToken = jwt.sign(
        {
          email: createUser.email,
          username: createUser.fullName,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
      );

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
          email: foundUser.email,
          username: foundUser.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "2h",
        }
      );

      const refreshToken = jwt.sign(
        {
          email: foundUser.email,
          username: foundUser.fullName,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
      );

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
  res.clearCookie("jwt");
  return res.sendStatus(200);
};

export const RefreshToken = async (req, res) => {
  const jwtCookie = req.cookies.jwt;
  if (!jwtCookie) return res.sendStatus(401);

  try {
    const decodedJWT = jwt.verify(
      jwtCookie,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decode) => {
        if (err) return res.sendStatus(403);
        return decode;
      }
    );
    const foundUser = await UserModel.findOne({
      email: decodedJWT.email,
      fullName: decodedJWT.username,
    });
    const payload = { email: foundUser.email, username: foundUser.fullName };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "2h",
    });
    return res.status(200).json({ accessToken });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};
