import { model, Schema } from "mongoose";
import { TRoom } from "./rooms.interface";

const roomSchema = new Schema<TRoom>(
  {
    name: {
      type: String,
      required: true,
    },
    floorNo: {
      type: Number,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    pricePerSlot: { type: Number, required: true },
    amenities: { type: [String], required: true },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const roomModel = model<TRoom>("Room", roomSchema);
export default roomModel;
