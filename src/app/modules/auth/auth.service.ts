/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import bcrypt from "bcrypt";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import AppError from "../../errors/AppErrors";
import { createToken, verifyToken } from "./auth.utils";

import toTitleCase from "../../helper/toTitleCase";
import userModel from "../users/users.model";
import { TUser } from "../users/users.interface";

// ========>:   Create User Into Database Function   :<========

const createUserIntoDB = async (user: TUser) => {
  const { name, email, password, role, phone, address } = user;
  const isExistUser = await userModel.findOne({ email: user.email });

  if (isExistUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exist!");
  }

  const result = await userModel.create({
    name,
    email,
    password,
    phone,
    role,
    address,
  });
  return result;
};

// ========>:   Login user with email and password Function   :<========

const loginUser = async (payload: TUser) => {
  const { email, password } = payload;

  const user = await userModel
    .findOne({
      email,
    })
    .select("+password");

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "user not found!");
  }

  const isDeleted = user.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "user already deleted!");
  }

  const hashedPassword = await bcrypt.compare(password, user.password);

  if (!hashedPassword) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "email and password does not match!"
    );
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role || "volunteer",
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_Access_Expires_in as string
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_Refresh_Expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    user,
  };
};

export const AuthServices = {
  createUserIntoDB,
  loginUser,
};
