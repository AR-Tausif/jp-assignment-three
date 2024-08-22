import { Router } from "express";
import { RoomControllers } from "./rooms.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../users/users.interface";

const router = Router();

// creating room route function
router.post("/", auth(USER_ROLE.ADMIN), RoomControllers.createRoomIntoDB);
// get the room with mongoose object id route function
router.get("/:roomId", RoomControllers.getSingleRoomById);
// get available all room from database route function
router.get("/", RoomControllers.getAllRooms);
// delete the room with mongoose object id route function
router.delete(
  "/:roomId",
  auth(USER_ROLE.ADMIN),
  RoomControllers.deleteRoomById
);

export const RoomRoutes = router;
