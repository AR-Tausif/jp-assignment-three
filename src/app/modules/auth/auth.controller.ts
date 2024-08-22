// import httpStatus from 'http-status';
// import { JwtPayload } from 'jsonwebtoken';
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";

import sendResponse from "../../utils/sendResponse";

// ================================================
// create User Into DB
// ================================================

const createUser = catchAsync(async (req, res) => {
  const user = req.body;
  const result = await AuthServices.createUserIntoDB(user);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

// ================================================
// User Login
// ================================================

const LoginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken, accessToken, user } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: false,
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is logged in succesfully!",
    data: {
      token: accessToken,
      user,
    },
  });
});

export const AuthController = {
  createUser,
  LoginUser,
};
