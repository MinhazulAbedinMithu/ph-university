import { TAcademicSemester } from './../academicSemester/academicSemester.interface';
import config from '../../config';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { generateStudentId } from './user.utils';

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
  userData.id = await generateStudentId(admissionSemester as TAcademicSemester);

  userData.role = 'student';

  //Create an User
  const newUser = await UserModel.create(userData);

  if (Object.keys(newUser).length) {
    // set student id, user id

    payload.id = newUser.id;
    payload.user = newUser._id;
    const newStudent = await StudentModel.create(payload);

    return newStudent;
  }
};
export const userServices = { createStudent };
