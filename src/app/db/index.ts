import config from "../config";
import { USER_ROLE } from "../modules/auth/auth.constant";
import { TUser } from "../modules/users/users.interface";
import userModel from "../modules/users/users.model";

const superAdmin: TUser = {
  username: "super-admin",
  fullName: "New Bangladesh",
  phoneNumber: 1700000004,
  email: "abc@gmail.com",
  password: config.super_admin_password as string,
  role: USER_ROLE.superAdmin,
  isDeleted: false,
  status: "active",
};

const seedSuperAdmin = async () => {
  const isSuperAdminExist = await userModel.findOne({
    role: USER_ROLE.superAdmin,
  });

  if (!isSuperAdminExist) {
    await userModel.create(superAdmin);
  }
};

export default seedSuperAdmin;
