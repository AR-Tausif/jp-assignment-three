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
// retrieved all bookings by loggedin user id
router.get(
  "/my-bookings",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  BookingControllers.getSingleUserBookings
);
// update the authenticated user booking isConfirmed property
router.put(
  "/:id",
  auth(USER_ROLE.ADMIN),
  validateRequest(bookingValidations.bookingUpdateByAdmin),
  BookingControllers.updateBookingStatusByAdmin
);

export const bookingsRoutes = router;
