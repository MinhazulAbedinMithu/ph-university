import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFacultyModel } from './academicFaculty.model';

const createAcademicFaculty = async (payload: TAcademicFaculty) => {
  const result = await AcademicFacultyModel.create(payload);
  return result;
};

// Get All Faculty
const getAllAcademicFaculty = async () => {
  const result = await AcademicFacultyModel.find({});
  return result;
};

//Get Single Academic faculty
const getSingleAcademicFaculty = async (facultyId: string) => {
  const result = await AcademicFacultyModel.findOne({ _id: facultyId });
  return result;
};

// Update Academic Faculty
const updateAcademicFaculty = async (
  facultyId: string,
  payload: TAcademicFaculty,
) => {
  const result = await AcademicFacultyModel.findOneAndUpdate(
    { _id: facultyId },
    payload,
  );
  return result;
};

// Delete Academic Faculty
const deleteAcademicFaculty = async (facultyId: string) => {
  const result = await AcademicFacultyModel.findOneAndUpdate(
    {
      _id: facultyId,
    },
    {
      isDeleted: true,
    },
  );
  return result;
};

export const academicFacultyServices = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
  deleteAcademicFaculty,
};
