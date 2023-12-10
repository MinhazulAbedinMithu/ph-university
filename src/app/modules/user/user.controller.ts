import { TStudent } from './../student/student.interface';
import { userServices } from './user.service';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { TFaculty } from '../Faculty/faculty.interface';
import { TAdmin } from '../Admin/admin.interface';

//Create Student
const createStudent = catchAsync(async (req, res) => {
  const {
    password,
    student,
  }: { password: string; student: Partial<TStudent> } = req.body;

  const result = await userServices.createStudent(password, student);

  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NO_CONTENT,
      success: false,
      message: 'Something went wrong!!!',
      data: result,
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Created Successfully',
    data: result,
  });
});

//create Faculty
const createFaculty = catchAsync(async (req, res) => {
  const {
    password,
    faculty,
  }: { password: string; faculty: Partial<TFaculty> } = req.body;

  const result = await userServices.createFaculty(password, faculty);

  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NO_CONTENT,
      success: false,
      message: 'Something went wrong!!!',
      data: result,
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty Created Successfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin }: { password: string; admin: Partial<TAdmin> } =
    req.body;

  const result = await userServices.createAdmin(password, admin);

  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NO_CONTENT,
      success: false,
      message: 'Something went wrong!!!',
      data: result,
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin Created Successfully',
    data: result,
  });
});
export const userControllers = { createStudent, createFaculty, createAdmin };
