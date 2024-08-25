/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import config from "../config";

const GlobalErrorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  const errorMessage = err.value + ` `;
  return res.status(statusCode).json({
    success: false,
    errorMessage,
    message,
    errorDetails: err,
    stack: config.node_env == "development" ? err.stack : null,
  });
};

export default GlobalErrorHandler;
