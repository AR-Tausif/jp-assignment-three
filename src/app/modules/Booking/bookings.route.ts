import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../users/users.interface";
import { BookingControllers } from "./bookings.controller";
import validateRequest from "../../middlewares/validateRequest";
import { bookingValidations } from "./bookings.validation";

const router = Router();

// book slots for a room
router.post(
  "/",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  validateRequest(bookingValidations.bookingSchema),
  BookingControllers.createBookingIntoDB
);
// get all bookings
router.get("/", auth(USER_ROLE.ADMIN), BookingControllers.getAllBookingsFromDB);
// get my available bookings
router.get(
  "/my-bookings",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  BookingControllers.getSingleUserBookings
);
// connfirm a booking
router.put(
  "/:id",
  auth(USER_ROLE.ADMIN),
  validateRequest(bookingValidations.bookingUpdateByAdmin),
  BookingControllers.updateBookingStatusByAdmin
);
// delete booking
router.delete(
  "/:id",
  auth(USER_ROLE.ADMIN),
  BookingControllers.deleteSingleBookingById
);

export const bookingsRoutes = router;
