export const USER_ROLE = {
  ADMIN: "admin",
  USER: "user",
} as const;
export type TUserRole = "admin" | "user";

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: TUserRole;
  isDeleted: boolean;
};
