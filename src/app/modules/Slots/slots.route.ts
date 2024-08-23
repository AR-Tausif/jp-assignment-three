import { Router } from "express";
import { SlotControllers } from "./slots.controller";
import { USER_ROLE } from "../users/users.interface";
import auth from "../../middlewares/auth";

const router = Router();

// creating slot route function
router.post("/", auth(USER_ROLE.ADMIN), SlotControllers.createSlotIntoDB);
// get the room with mongoose object id route function
router.get("/availability", SlotControllers.slotAvailability);
// // get available all room from database route function
// router.get("/", RoomControllers.getAllRooms);
// // delete the room with mongoose object id route function
// router.delete(
//   "/:roomId",
//   auth(USER_ROLE.ADMIN),
//   RoomControllers.deleteRoomById
// );

export const SlotRoutes = router;
