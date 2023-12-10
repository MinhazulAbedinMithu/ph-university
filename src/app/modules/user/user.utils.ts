import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { UserModel } from './user.model';

const findLastUserId = async (role: string) => {
  const lastUser = await UserModel.findOne(
    {
      role: role,
    },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean();
  // return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
  return lastUser?.id ? lastUser.id : undefined;
};

export const generateStudentId = async (
  admissionSemester: TAcademicSemester,
) => {
  //first time
  let currentId = (0).toString();
  const lastStudentId = await findLastUserId('student');
  const lastStudentYear = lastStudentId?.substring(0, 4);
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  if (
    lastStudentId &&
    lastStudentSemesterCode === admissionSemester.code &&
    lastStudentYear === admissionSemester.year
  ) {
    currentId = lastStudentId.substring(6);
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${admissionSemester.year}${admissionSemester.code}${incrementId}`;

  return incrementId;
};

export const generateId = async (type: string) => {
  //first time
  let currentId = (0).toString();
  const lastUserId = await findLastUserId(type);
  if (lastUserId) {
    currentId = lastUserId.substring(2);
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${type.substring(0, 1).toUpperCase()}-${incrementId}`;

  return incrementId;
};
