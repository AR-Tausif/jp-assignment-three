import { Router } from "express";
import { UserControllers } from "./users.controller";
import { USER_ROLE } from "./users.interface";
import auth from "../../middlewares/auth";

const router = Router();
router.get("/", UserControllers.getAllUser);

// get single user by user id
router.get("/:userId", UserControllers.getSingleUserById)

// creating volunteer by admin user
router.post(
  "/",
  auth(USER_ROLE.ADMIN, USER_ROLE.TEAM_LEADER),
  UserControllers.creatingVolunteer
);
// deleting just volunteer by admin and team leader with volunteer _id
router.delete(
  "/:userId",
  auth(USER_ROLE.ADMIN, USER_ROLE.TEAM_LEADER),
  UserControllers.deleteVolunteerById
);
// approve volunter from pending status by volunteer objectId
router.post(
  "/approve-volunteer",
  auth(USER_ROLE.ADMIN, USER_ROLE.TEAM_LEADER),
  UserControllers.approveVolunteer
);
// changing role to admin by existing admin user
router.post("/make-admin", auth(USER_ROLE.ADMIN), UserControllers.makeAdmin);

// changing role to team leader by admin user
router.post(
  "/make-leader",
  auth(USER_ROLE.ADMIN),
  UserControllers.makeTeamLeader
);

// changing role to volunteer by admin user
router.post(
  "/make-volunteer",
  auth(USER_ROLE.ADMIN),
  UserControllers.makeDefaultUserRole
);

export const UserRoutes = router;
