import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./users.service";
import catchAsync from "../../utils/catchAsync";

const getAllUser = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUser();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "volunteers are successfully retrieved!",
    data: result,
  });
});
const getSingleUserById = catchAsync(async(req, res)=>{
  const {userId} = req.params;
    const result = await UserServices.getSingleUserById(userId);


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "volunteer successfully retrieved!",
    data: result,
  });
})

const creatingVolunteer = catchAsync(async (req, res) => {
  // distructuring userid from route request query
  const body = req.body;
  const result = await UserServices.createVolunteerIntoDB(body);

  // sending response with my custom dynamic object
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "made team leader!",
    data: result,
  });
});

// deleting user role of volunteer by objectId
const deleteVolunteerById = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await UserServices.deleteVolunteerById(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "volunteer deleted!",
    data: result,
  });
});

// approving user status pending true to false
const approveVolunteer = catchAsync(async (req, res) => {
  const { userId } = req.query;
  const result = await UserServices.approveVolunteer(userId as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "volunteer approved!",
    data: result,
  });
});

// changin user role volunteer or team_leader to admin by objectId
const makeAdmin = catchAsync(async (req, res) => {
  // distructuring userid from route request query
  const { userId } = req.query;
  const result = await UserServices.makeAdmin(userId as string);

  // sending response with my custom dynamic object
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "made admin!",
    data: result,
  });
});

// changing user role volunteer or admin to team_leader by objectId
const makeTeamLeader = catchAsync(async (req, res) => {
  // distructuring userid from route request query
  const { userId } = req.query;
  const result = await UserServices.makeTeamLeader(userId as string);

  // sending response with my custom dynamic object
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "made team leader!",
    data: result,
  });
});

// changing user role admin or team_leader to volunteer by objectId
const makeDefaultUserRole = catchAsync(async (req, res) => {
  // distructuring userid from route request query
  const { userId } = req.query;
  const result = await UserServices.makeDefaultUserRole(userId as string);

  // sending response with my custom dynamic object
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "made volunteer!",
    data: result,
  });
});

export const UserControllers = {
  getAllUser,
  getSingleUserById,
  creatingVolunteer,
  deleteVolunteerById,
  approveVolunteer,
  makeAdmin,
  makeTeamLeader,
  makeDefaultUserRole,
};
