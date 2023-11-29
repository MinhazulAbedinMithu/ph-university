import { TStudent } from './../student/student.interface';
import { NextFunction, Request, Response } from 'express';
import { TUser } from './user.interface';
import { userValidation } from './user.validation';
import { userServices } from './user.service';

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
    // const { password  = userValidation.userValidationSchema.parse(password);

    const result = await userServices.createStudent(password, student);

    if (!result) {
      res.status(400).json({
        success: true,
        message: 'Something went wrong !!!',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Student Created Successfully',
    });
  } catch (error: any) {
    next(error);
  }
};
export const userControllers = { createStudent };
