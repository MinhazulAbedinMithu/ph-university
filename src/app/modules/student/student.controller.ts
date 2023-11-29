import { NextFunction, Request, Response } from 'express';
import { studentServices } from './student.services';
import { TStudent } from './student.interface';
import { studentValidationSchema } from './student.zod.validation';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
// import studentValidationSchema from './student.validation';

//Get All student
const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await studentServices.getAllStudents();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get All Students',
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

//Get student by id
const getStudentById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const studentId: string = req.params.id;

    const result = await studentServices.getStudentById(studentId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get Student Details',
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

// Delete Student by Id
const deleteStudentById = async (req: Request, res: Response) => {
  const studentId = req.params.id;
  const result = studentServices.deleteStudentById(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Deleted Successfully',
    data: result,
  });
};

export const studentControllers = {
  getAllStudents,
  getStudentById,
  deleteStudentById,
};
