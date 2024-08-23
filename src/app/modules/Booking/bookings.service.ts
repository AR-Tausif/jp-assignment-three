import httpStatus from "http-status";
import AppError from "../../errors/AppErrors";
import { TRoom } from "./rooms.interface";
import roomModel from "./rooms.model";

const createRoomIntoDB = async (payload: Partial<TRoom>) => {
  const result = await roomModel.create({
    name: payload.name,
    roomNo: payload.roomNo,
    floorNo: payload.floorNo,
    capacity: payload.capacity,
    pricePerSlot: payload.pricePerSlot,
    amenities: payload.amenities,
  });
  return result;
};

const getSingleRoomById = async (roomId: string) => {
  const room = await roomModel.findById(roomId);

  // throw error when room is empty and deleted
  if (!room || room.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "Room not found");
  }
  return room;
};

const getAllRooms = async () => {
  // get all available rooms without deleted rooms
  const result = await roomModel.find({ isDeleted: false });
  return result;
};

const deleteRoomById = async (roomId: string) => {
  // here just update isDeleted property for soft deleting
  const result = await roomModel.findByIdAndUpdate(
    roomId,
    { isDeleted: true },
    { new: true }
  );

  // throw error when result is empty
  if (!result) {
    throw new AppError(httpStatus.FORBIDDEN, "Cannot delete room");
  }
  return result;
};
export const RoomServices = {
  createRoomIntoDB,
  getSingleRoomById,
  getAllRooms,
  deleteRoomById,
};
