import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { RoomServices } from "./rooms.service";
import catchAsync from "../../utils/catchAsync";

const createRoomIntoDB = catchAsync(async (req, res) => {
  const { name, roomNo, floorNo, capacity, pricePerSlot, amenities } = req.body;
  const result = await RoomServices.createRoomIntoDB({
    name,
    roomNo,
    floorNo,
    capacity,
    pricePerSlot,
    amenities,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Room added successfully",
    data: result,
  });
});

const getSingleRoomById = catchAsync(async (req, res) => {
  // get the room mongoose object id from url route params
  const { id } = req.params;
  const result = await RoomServices.getSingleRoomById(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Room retrieved successfully",
    data: result,
  });
});

const getAllRooms = catchAsync(async (req, res) => {
  const result = await RoomServices.getAllRooms();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rooms retrieved successfully",
    data: result,
  });
});

const deleteRoomById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await RoomServices.deleteRoomById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Room deleted successfully",
    data: result,
  });
});
const updateRoomByRoomId = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await RoomServices.updateRoomByRoomId({
    id,
    payload: req.body,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Room deleted successfully",
    data: result,
  });
});

export const RoomControllers = {
  createRoomIntoDB,
  getSingleRoomById,
  getAllRooms,
  deleteRoomById,
  updateRoomByRoomId,
};
