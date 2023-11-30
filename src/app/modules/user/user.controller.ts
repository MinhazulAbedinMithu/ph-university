import { TStudent } from './../student/student.interface';
import { userServices } from './user.service';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

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
export const userControllers = { createStudent };
