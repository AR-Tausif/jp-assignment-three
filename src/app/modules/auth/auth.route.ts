import express from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidations } from "../users/users.validation";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(userValidations.userSchema),
  AuthController.createUser
);
router.post("/login", AuthController.LoginUser);

export const AuthRoutes = router;
