import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { facultyServices } from './faculty.service';

//Get All faculty
const getAllFaculties = catchAsync(async (req, res, next) => {
  const result = await facultyServices.getAllFaculties(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Faculties',
    data: result,
  });
});

//Get Faculty by id
const getFacultyById = catchAsync(async (req, res, next) => {
  const facultyId: string = req.params.id;

  const result = await facultyServices.getFacultyById(facultyId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Faculty Details',
    data: result,
  });
});

//Update Faculty by id
const updateFacultyById = catchAsync(async (req, res) => {
  const facultyId = req.params.id;
  const { faculty } = req.body;
  const result = await facultyServices.updateFacultyById(facultyId, faculty);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty updated Successfully',
    data: result,
  });
});

// Delete Faculty by Id
const deleteFacultyById = catchAsync(async (req, res) => {
  const facultyId = req.params.id;
  const result = await facultyServices.deleteFacultyById(facultyId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty Deleted Successfully',
    data: result,
  });
});

export const facultyControllers = {
  getAllFaculties,
  getFacultyById,
  updateFacultyById,
  deleteFacultyById,
};
