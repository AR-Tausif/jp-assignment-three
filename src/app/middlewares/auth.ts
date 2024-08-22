import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppErrors";
import catchAsync from "../utils/catchAsync";
import { TUserRole } from "../modules/users/users.interface";
import jwtVerify from "../helper/jwtVerify";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authorizeStr = req.headers.authorization;
    if (!authorizeStr) {
      throw new AppError(httpStatus.UNAUTHORIZED, "you have lost your token!");
    }

    const [, token] = authorizeStr.split(" ");

    try {
      const decoded = jwtVerify(
        token,
        config.jwt_access_secret as string
      ) as JwtPayload;
      const role = decoded.role;

      if (
        requiredRoles.length > 0 &&
        !requiredRoles.includes(role as TUserRole)
      ) {
        throw new AppError(httpStatus.FORBIDDEN, "You Are Not Authorized");
      }

      req.username = decoded;
      next();
    } catch (err) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You Are Not Authorized");
    }
  });
};

export default auth;
