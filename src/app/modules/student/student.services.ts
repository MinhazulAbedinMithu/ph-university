import { TStudent } from './student.interface';
import { StudentModel } from './student.model';

const getAllStudents = async () => {
  const result = await StudentModel.find();
  return result;
};
const getStudentById = async (id: string) => {
  // const result = await StudentModel.findOne({ id });
  const result = await StudentModel.aggregate([{ $match: { id: id } }]);
  return result;
};
const deleteStudentById = async (id: string) => {
  const result = await StudentModel.updateOne({ id }, { isDeleted: true });
  return result;
};
export const studentServices = {
  getAllStudents,
  getStudentById,
  deleteStudentById,
};
