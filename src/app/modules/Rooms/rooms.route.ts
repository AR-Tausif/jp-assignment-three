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
// get the room with mongoose object id route function
router.get("/:id", RoomControllers.getSingleRoomById);
// get available all room from database route function
router.get("/", RoomControllers.getAllRooms);
// delete the room with mongoose object id route function
router.delete("/:id", auth(USER_ROLE.ADMIN), RoomControllers.deleteRoomById);
// update room by room id route function
router.put(
  "/:id",
  auth(USER_ROLE.ADMIN),
  validateRequest(RoomValidations.roomUpdateSchema),
  RoomControllers.updateRoomByRoomId
);

export const RoomRoutes = router;
