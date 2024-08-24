import httpStatus from "http-status";
import AppError from "../../errors/AppErrors";
import roomModel from "../Rooms/rooms.model";
import slotModel from "../Slots/slots.model";
import { TBooking } from "./booking.interface";
import bookingModel from "./bookings.model";
import { Types } from "mongoose";
const createBookingsIntoDB = async (payload: Partial<TBooking>) => {
  // Check if the room exists in the database
  const room = await roomModel.findById(payload.room);
  if (!room) {
    throw new AppError(httpStatus.NOT_FOUND, "Room not found");
  }

  // Prepare the slots array
  const originalSlots: Types.ObjectId[] = [];

  for (const id of payload.slots || []) {
    const slot = await slotModel.findById(id);
    if (slot) {
      if (slot.isBooked) {
        throw new AppError(
          httpStatus.FORBIDDEN,
          `${slot._id} already booked. so try another`
        );
      }
      slot.isBooked = true;
      await slot.save();
      originalSlots.push(id);
    }
  }

  // Calculate the total amount
  const totalBookedAmount = room.pricePerSlot * originalSlots.length;

  // Create the booking document
  const booked = await bookingModel.create({
    room: room._id,
    slots: originalSlots, // Directly use originalSlots, no nested array
    date: payload.date,
    totalAmount: totalBookedAmount,
    user: payload.user,
  });

  // Populate the slots and room fields
  const populatedBooking = await bookingModel
    .findById(booked._id)
    .populate("slots")
    .populate("room")
    .populate("user")
    .exec();

  return populatedBooking;
};

const getAllBookingsFromDB = async () => {
  const result = await bookingModel
    .find({})
    .populate("slots")
    .populate("room")
    .populate("user")
    .exec();

  return result;
};

const getSingleUserBookings = async (userId: string) => {
  const result = await bookingModel
    .find({ user: userId })
    .populate("slots")
    .populate("room")
    .populate("user")
    .exec();
  return result;
};

const updateBookingStatusByAdmin = async (payload: {
  id: string;
  data: { isConfirmed: string };
}) => {
  const result = await bookingModel.findByIdAndUpdate(
    payload.id,
    { isConfirmed: payload.data.isConfirmed },
    { new: true }
  );
  return result;
};

export const BookingServices = {
  createBookingsIntoDB,
  getAllBookingsFromDB,
  getSingleUserBookings,
  updateBookingStatusByAdmin,
};
