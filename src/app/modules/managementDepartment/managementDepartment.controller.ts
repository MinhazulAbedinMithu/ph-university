import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { academicDepartmentServices } from './managementDepartment.service';

//create Academic Department
const createAcademicDepartment = catchAsync(async (req, res, next) => {
  const newAcademicDepartment =
    await academicDepartmentServices.createAcademicDepartment(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Department created Successfylly',
    data: newAcademicDepartment,
  });
});

//Get All academic Department
const getAllAcademicDepartment = catchAsync(async (req, res, next) => {
  const result = await academicDepartmentServices.getAllAcademicDepartment();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fetch all Academic Department',
    data: result,
  });
});

//Get Single Academic Department
const getSingleAcademicDepartment = catchAsync(async (req, res, next) => {
  const result = await academicDepartmentServices.getSingleAcademicDepartment(
    req.params.id,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get single Academic Department',
    data: result,
  });
});

// Update Academic Department
const updateAcademicDepartment = catchAsync(async (req, res, next) => {
  const result = await academicDepartmentServices.updateAcademicDepartment(
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department updated successfully',
    data: result,
  });
});

// Delete Academic Department
const deleteAcademicDepartment = catchAsync(async (req, res, next) => {
  const result = await academicDepartmentServices.deleteAcademicDepartment(
    req.params.id,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department deleted successfully',
    data: result,
  });
});

export const academicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
  deleteAcademicDepartment,
};
