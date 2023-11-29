import { Request, Response } from 'express';
import { studentServices } from './student.services';
import { TStudent } from './student.interface';
import { studentValidationSchema } from './student.zod.validation';
// import studentValidationSchema from './student.validation';

//Get All student
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getAllStudents();
    res.status(200).json({
      success: true,
      message: 'Get All students',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong !!!',
    });
  }
};

//Get student by id
const getStudentById = async (req: Request, res: Response) => {
  try {
    const studentId: string = req.params.id;

    const result = await studentServices.getStudentById(studentId);
    res.status(200).json({
      success: true,
      message: 'Get Student Data',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong !!!',
    });
  }
};

// Delete Student by Id
const deleteStudentById = async (req: Request, res: Response) => {
  const studentId = req.params.id;
  const result = studentServices.deleteStudentById(studentId);
  res.status(300).json({
    success: true,
    message: 'Student Deleted',
    data: result,
  });
};

export const studentControllers = {
  getAllStudents,
  getStudentById,
  deleteStudentById,
};
