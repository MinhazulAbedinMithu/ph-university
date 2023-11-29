import { TStudent } from './../student/student.interface';
import { NextFunction, Request, Response } from 'express';
import { TUser } from './user.interface';
import { userValidation } from './user.validation';
import { userServices } from './user.service';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';

//Create Student
const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      password,
      student,
    }: { password: string; student: Partial<TStudent> } = req.body;
    // const parsedPassword = userValidation.userValidationSchema.parse(password);

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
  } catch (error: any) {
    next(error);
  }
};
export const userControllers = { createStudent };
