import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { adminServices } from './admin.service';

//Get All Admin
const getAllAdmins = catchAsync(async (req, res, next) => {
  const result = await adminServices.getAllAdmins(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Admins',
    data: result,
  });
});

//Get Admin by id
const getAdminById = catchAsync(async (req, res, next) => {
  const adminId: string = req.params.id;

  const result = await adminServices.getAdminById(adminId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Admin Details',
    data: result,
  });
});

//Update Admin by id
const updateAdminById = catchAsync(async (req, res) => {
  const adminId = req.params.id;
  const { admin } = req.body;
  const result = await adminServices.updateAdminById(adminId, admin);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin updated Successfully',
    data: result,
  });
});

// Delete Admin by Id
const deleteAdminById = catchAsync(async (req, res) => {
  const adminId = req.params.id;
  const result = await adminServices.deleteAdminById(adminId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin Deleted Successfully',
    data: result,
  });
});

export const adminControllers = {
  getAllAdmins,
  getAdminById,
  updateAdminById,
  deleteAdminById,
};
