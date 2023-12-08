import { TAcademicSemester } from './../academicSemester/academicSemester.interface';
import config from '../../config';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { generateStudentId } from './user.utils';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';

// create student
const createStudent = async (password: string, payload: Partial<TStudent>) => {
  //   if (await UserModel.isStudentExist(studentData.id)) {
  //     throw new Error('Student already exist !!!');
  //   }
  const userData: Partial<TUser> = {};

  //password not given by admin, set default
  userData.password = password
    ? password
    : (config.student_default_pass as string);

  // set student Id
  const admissionSemester = await AcademicSemesterModel.findById(
    payload.admissionSemester,
  );
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateStudentId(
      admissionSemester as TAcademicSemester,
    );

    userData.role = 'student';

    //Create an User [transaction-1]
    const newUser = await UserModel.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create User');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    const newStudent = await StudentModel.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
  }
};
export const userServices = { createStudent };
