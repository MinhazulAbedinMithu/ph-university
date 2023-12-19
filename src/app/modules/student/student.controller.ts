import { studentServices } from './student.service';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

//Get All student
const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await studentServices.getAllStudents(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Students',
    data: result,
  });
});

//Get student by id
const getStudentById = catchAsync(async (req, res, next) => {
  const id: string = req.params.id;

  const result = await studentServices.getStudentById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Student Details',
    data: result,
  });
});

//Update student by id
const updateStudentById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const { student } = req.body;
  const result = await studentServices.updateStudentById(id, student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student updated Successfully',
    data: result,
  });
});

// Delete Student by Id
const deleteStudentById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await studentServices.deleteStudentById(id);

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
  updateStudentById,
  deleteStudentById,
};
