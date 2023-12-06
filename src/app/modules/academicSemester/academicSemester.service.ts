import { AcademicSemesterNameCodeMaper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemesterModel } from './academicSemester.model';

// Create Academic semester
const createAcademicSemester = async (payload: TAcademicSemester) => {
  if (AcademicSemesterNameCodeMaper[payload.name] !== payload.code) {
    throw new Error('Academic Semester code is not valid.');
  }
  const result = await AcademicSemesterModel.create(payload);
  return result;
};

// Get All Academic Semester
const getAcademicSemesters = async () => {
  const result = await AcademicSemesterModel.find({});
  return result;
};

// Get Single Semester
const getAcademicSemester = async (id: string) => {
  const result = await AcademicSemesterModel.find({ _id: id });
  return result;
};

// update Single Semester
const updateAcademicSemester = async (payload: any) => {
  const result = await AcademicSemesterModel.findOneAndUpdate(
    { _id: payload.id },
    payload.body,
  );
  return result;
};

export const academicSemesterServices = {
  createAcademicSemester,
  getAcademicSemesters,
  getAcademicSemester,
  updateAcademicSemester,
};
