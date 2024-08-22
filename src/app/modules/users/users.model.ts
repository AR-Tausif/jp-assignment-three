import { model, Schema } from "mongoose";

import config from "../../config";
import bcrypt from "bcrypt";
import { TUser, USER_ROLE } from "./users.interface";

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
      enum: [USER_ROLE.ADMIN, USER_ROLE.USER],
      default: "user",
    },
    address: String,
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

// Hash the password before saving the user model
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

const userModel = model<TUser>("User", userSchema);
export default userModel;
