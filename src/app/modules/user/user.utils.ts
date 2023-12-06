import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { UserModel } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await UserModel.findOne(
    {
      role: 'student',
    },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean();
  // return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generateStudentId = async (
  admissionSemester: TAcademicSemester,
) => {
  //first time
  let currentId = (0).toString();
  const lastStudentId = await findLastStudentId();
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
