import { studentServices } from './student.services';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

//Get All student
const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await studentServices.getAllStudents();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Students',
    data: result,
  });
});

//Get student by id
const getStudentById = catchAsync(async (req, res, next) => {
  const studentId: string = req.params.id;

  const result = await studentServices.getStudentById(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Student Details',
    data: result,
  });
});

// Delete Student by Id
const deleteStudentById = catchAsync(async (req, res) => {
  const studentId = req.params.id;
  const result = studentServices.deleteStudentById(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Deleted Successfully',
    data: result,
  });
});

export const studentControllers = {
  getAllStudents,
  getStudentById,
  deleteStudentById,
};
