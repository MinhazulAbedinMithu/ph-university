import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemesterModel } from './academicSemester.model';

// Create Academic semester
const createAcademicSemester = async (payload: TAcademicSemester) => {
  const result = await AcademicSemesterModel.create(payload);
  return result;
};

export const academicSemesterServices = {
  createAcademicSemester,
};
