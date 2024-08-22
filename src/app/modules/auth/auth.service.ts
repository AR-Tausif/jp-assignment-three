/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import bcrypt from "bcrypt";
import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppErrors";
import { createToken, verifyToken } from "./auth.utils";

import toTitleCase from "../../helper/toTitleCase";
import userModel from "../users/users.model";
import { TUser } from "../users/users.interface";
import comparedHashedText from "../../helper/compareHashedText";

const createUserIntoDB = async (user: TUser) => {
  const { name, email, password, role, phone, address } = user;
  const isExistUser = await userModel.findOne({ email: user.email });

  // checking user that is not exist on database
  if (isExistUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exist!");
  }

  // create user with mongoose model
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

const loginUser = async (payload: TUser) => {
  const { email, password } = payload;

  // here finding the user record on database and also getting password with '+(operator)password'
  const user = await userModel
    .findOne({
      email,
    })
    .select("+password");

  // checking user exist or not
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "user not found!");
  }

  // also checking user deleted or not
  const isDeleted = user.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "user already deleted!");
  }

  // checking the plaintext password is correct or not
  const hashedPassword = await comparedHashedText(password, user.password);

  // here will throw error if password not matched!
  if (!hashedPassword) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "email and password does not match!"
    );
  }

  // defined a object for storing jwt payload in token
  const jwtPayload = {
    userId: user.id,
    role: user.role || "volunteer",
  };

  // access token creating with utils function
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_Access_Expires_in as string
  );

  // refresh token creating with utils function
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_Refresh_Expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      address: user.address,
    },
  };
};

export const AuthServices = {
  createUserIntoDB,
  loginUser,
};
