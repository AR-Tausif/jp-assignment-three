import { formatTime } from "./slots.constants";
import { TSlot } from "./slots.interface";
import slotModel from "./slots.model";

const createSlotIntoDB = async (payload: Partial<TSlot>) => {
  // parse string into date
  const startTime = new Date(`${payload.date}T${payload.startTime}Z`);
  const endTime = new Date(`${payload.date}T${payload.endTime}Z`);

  const getHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);

  const newSlots = Array.from({ length: getHours }).map((d, i) => {
    const slotStart = new Date(startTime.getTime() + 1000 * 60 * 60 * i);
    const slotEnd = new Date(slotStart.getTime() + 1000 * 60 * 60);
    return {
      room: payload.room,
      date: payload.date,
      startTime: formatTime(slotStart),
      endTime: formatTime(slotEnd),
    };
  });

  const result = await slotModel.create(newSlots);

  return result;
};

const slotAvailability = async (payload: { date: string; roomId: string }) => {
  let result;
  if (payload.date && payload.roomId) {
    result = await slotModel.find({ isBooked: false });
  } else {
    result = await slotModel.find({ room: payload.roomId, date: payload.date });
  }
  return result;
};

export const SlotServices = {
  createSlotIntoDB,
  slotAvailability,
};
