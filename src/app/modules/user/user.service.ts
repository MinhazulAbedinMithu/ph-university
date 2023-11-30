import config from '../../config';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';

// create student
const createStudent = async (
  password: string,
  studentData: Partial<TStudent>,
) => {
  //   if (await UserModel.isStudentExist(studentData.id)) {
  //     throw new Error('Student already exist !!!');
  //   }
  const userData: Partial<TUser> = {};

  //password not given by admin, set default
  userData.password = password
    ? password
    : (config.student_default_pass as string);

  // set student Id
  userData.id = '173002006';

  userData.role = 'student';

  //Create an User
  const newUser = await UserModel.create(userData);

  if (Object.keys(newUser).length) {
    // set student id, user id

    studentData.id = newUser.id;
    studentData.user = newUser._id;
    const newStudent = await StudentModel.create(studentData);

    return newStudent;
  }
};
export const userServices = { createStudent };
