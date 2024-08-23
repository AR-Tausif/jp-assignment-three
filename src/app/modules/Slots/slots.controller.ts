import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SlotServices } from "./slots.service";

const createSlotIntoDB = catchAsync(async (req, res) => {
  const { room, date, startTime, endTime } = req.body;
  const result = await SlotServices.createSlotIntoDB({
    room,
    date,
    startTime,
    endTime,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Room added successfully",
    data: result,
  });
});

const slotAvailability = catchAsync(async (req, res) => {
  const { roomId, date } = req.query;
  const result = await SlotServices.slotAvailability({
    roomId: roomId as string,
    date: date as string,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Available slots retrieved successfully",
    data: result,
  });
});

export const SlotControllers = {
  createSlotIntoDB,
  slotAvailability,
};
