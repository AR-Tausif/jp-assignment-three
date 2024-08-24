import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../users/users.interface";
import { BookingControllers } from "./bookings.controller";
import validateRequest from "../../middlewares/validateRequest";
import { bookingValidations } from "./bookings.validation";

const router = Router();

// creating booking into database
router.post(
  "/",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  validateRequest(bookingValidations.bookingSchema),
  BookingControllers.createBookingIntoDB
);
// getting a list of all booking itesm from database
router.get("/", auth(USER_ROLE.ADMIN), BookingControllers.getAllBookingsFromDB);

export const bookingsRoutes = router;
