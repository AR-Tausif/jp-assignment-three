import httpStatus from "http-status";
import AppError from "../../errors/AppErrors";
import userModel from "./users.model";
import { USER_ROLE, TUser } from "./users.interface";

const getAllUser = async () => {
  const result = await userModel.find({ isDeleted: false });
  return result;
};
const getSingleUserById = async(userId:string)=>{
  const user = await userModel.findById(userId)
  if(!user){
    throw new AppError(httpStatus.NOT_FOUND, 'single user not found!')
  }
  return user
}

const createVolunteerIntoDB = async (user: TUser) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { name, email, password, role, contact, address, gender, institute, dob, occupation } = user;
  const isExistUser = await userModel.findOne({ email: user.email });

  if (isExistUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exist!");
  }

  const result = await userModel.create({
    name,
    email,
    password,
    contact,
    address,
    gender,
    institute,
    dob,
    occupation,
  });

  if(!result) {
    throw new AppError(httpStatus.BAD_REQUEST, "cannot created user!");
  }
  return result;
};
const deleteVolunteerById = async (userId: string) => {
  const result = await userModel.findOneAndUpdate(
    { _id: userId, role: "volunteer", isPending: false },
    {
      isDeleted: true,
    },
    {
      new: true,
    }
  );

  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "user not found or user not volunteer!"
    );
  }
  return result;
};

const approveVolunteer = async (userId: string) => {
  if (!userId) {
    throw new AppError(httpStatus.NOT_FOUND, "user id required!");
  }
  const user = await userModel.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "user not found!");
  }
  if (user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "user deleted!");
  }

  user.isPending = false;
  user.save();
  return user;
};

const makeAdmin = async (userId: string) => {
  // if user id value is null then throw an error first
  if (!userId) {
    throw new AppError(httpStatus.NOT_FOUND, "user id required!");
  }
  // find the user by objectId
  const user = await userModel.findById(userId);
  // returning an error if user not available on database
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "user not found!");
  }
  // check the user pending status
   if (user.isPending) {
    throw new AppError(httpStatus.BAD_REQUEST, "user to approved yet!");
  }
  // update the user role to team_leader
  user.role = USER_ROLE.ADMIN;
  // saving the updated values on server
  user.save();

  return user;
};

const makeTeamLeader = async (userId: string) => {
  // if user id value is null then throw an error first
  if (!userId) {
    throw new AppError(httpStatus.NOT_FOUND, "user id required!");
  }
  // find the user by objectId
  const user = await userModel.findById(userId);
  // returning an error if user not available on database
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "user not found!");
  }
  // update the user role to team_leader
  user.role = USER_ROLE.TEAM_LEADER;
  // saving the updated values on server
  user.save();

  return user;
};

const makeDefaultUserRole = async (userId: string) => {
  // if user id value is null then throw an error first
  if (!userId) {
    throw new AppError(httpStatus.NOT_FOUND, "user id required!");
  }
  // find the user by objectId
  const user = await userModel.findById(userId);
  // returning an error if user not available on database
  if (!user || user.isPending) {
    throw new AppError(httpStatus.NOT_FOUND, "user not found!");
  }
  // update the user role to volunteer
  user.role = USER_ROLE.VOLUNTEER;
  // saving the updated values on server
  user.save();

  return user;
};

export const UserServices = {
  getAllUser,
  getSingleUserById,
  createVolunteerIntoDB,
  deleteVolunteerById,
  approveVolunteer,
  makeAdmin,
  makeTeamLeader,
  makeDefaultUserRole,
};
