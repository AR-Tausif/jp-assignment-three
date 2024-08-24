import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./bookings.service";

const createBookingIntoDB = catchAsync(async (req, res) => {
  const result = await BookingServices.createBookingsIntoDB({
    room: req.body.room,
    slots: req.body.slots,
    date: req.body.date,
    user: req.user.userId,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking created successfully",
    data: result,
  });
});
const getAllBookingsFromDB = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookingsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All bookings retrieved successfully",
    data: result,
  });
});
const getSingleUserBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getSingleUserBookings(req.user.userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User bookings retrieved successfully",
    data: result,
  });
});
const updateBookingStatusByAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.updateBookingStatusByAdmin({
    id,
    data: req.body,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking updated successfully",
    data: result,
  });
});
const deleteSingleBookingById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.deleteSingleBookingById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking deleted successfully",
    data: result,
  });
});

export const BookingControllers = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getSingleUserBookings,
  updateBookingStatusByAdmin,
  deleteSingleBookingById,
};
