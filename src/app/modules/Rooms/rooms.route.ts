import { Router } from "express";
import { RoomControllers } from "./rooms.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../users/users.interface";
import validateRequest from "../../middlewares/validateRequest";
import { RoomValidations } from "./users.validation";

const router = Router();

// creating room route function
router.post(
  "/",
  auth(USER_ROLE.ADMIN),
  validateRequest(RoomValidations.roomSchema),
  RoomControllers.createRoomIntoDB
);
// get room by ID
router.get("/:id", RoomControllers.getSingleRoomById);
// get available all rooms
router.get("/", RoomControllers.getAllRooms);
// delete a room (soft delete)
router.delete("/:id", auth(USER_ROLE.ADMIN), RoomControllers.deleteRoomById);
// update room details
router.put(
  "/:id",
  auth(USER_ROLE.ADMIN),
  validateRequest(RoomValidations.roomUpdateSchema),
  RoomControllers.updateRoomByRoomId
);

export const RoomRoutes = router;
