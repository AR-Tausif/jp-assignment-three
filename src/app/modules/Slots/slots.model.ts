import { model, Schema } from "mongoose";
import { TSlot } from "./slots.interface";

const slotSchema = new Schema<TSlot>(
  {
    room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: { type: String, required: true },
    isBooked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const slotModel = model<TSlot>("Slot", slotSchema);
export default slotModel;
