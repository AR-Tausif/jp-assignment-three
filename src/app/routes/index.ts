import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { UserRoutes } from "../modules/users/users.route";
import { RoomRoutes } from "../modules/Rooms/rooms.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/rooms",
    route: RoomRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
