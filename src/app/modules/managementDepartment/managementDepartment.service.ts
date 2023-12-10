import { TAcademicDepartment } from './managementDepartment.interface';
import { AcademicDepartmentModel } from './managementDepartment.model';

const createAcademicDepartment = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartmentModel.create(payload);
  return result;
};

// Get All Department
const getAllAcademicDepartment = async () => {
  const result = await AcademicDepartmentModel.find({});

  return result;
};

//Get Single Academic Department
const getSingleAcademicDepartment = async (departmentId: string) => {
  const result = await AcademicDepartmentModel.findOne({ _id: departmentId });
  return result;
};

// Update Academic Department
const updateAcademicDepartment = async (
  departmentId: string,
  payload: TAcademicDepartment,
) => {
  const result = await AcademicDepartmentModel.findOneAndUpdate(
    { _id: departmentId },
    payload,
  );
  return result;
};

// Delete Academic Department
const deleteAcademicDepartment = async (departmentId: string) => {
  const result = await AcademicDepartmentModel.findOneAndUpdate(
    {
      _id: departmentId,
    },
    {
      isDeleted: true,
    },
  );
  return result;
};

export const academicDepartmentServices = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
  deleteAcademicDepartment,
};
