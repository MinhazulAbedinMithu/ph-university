import mongoose from 'mongoose';
import { StudentModel } from './student.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { UserModel } from '../user/user.model';
import { TStudent } from './student.interface';

const getAllStudents = async (query: Record<string, unknown>) => {
  const searchTerm = (query?.searchTerm || '') as string;
  const queryObj = { ...query };

  //Searching
  const searchFields = [
    'email',
    'id',
    'name.firstName',
    'name.lastName',
    'presentAddress',
    'bloodGroup',
  ];
  //{email: {$regex: query.searchTerm, $options: i}}
  const searchQuery = StudentModel.find({
    $or: searchFields.map((field) => {
      return {
        [field]: { $regex: searchTerm, $options: 'i' },
      };
    }),
  });

  // Filtering
  const filterExcludedFields = [
    'searchTerm',
    'sort',
    'limit',
    'page',
    'fields',
  ];
  filterExcludedFields.forEach((el) => delete queryObj[el]);
  const filterQuery = searchQuery
    .find(queryObj)
    .populate('user')
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: 'academicFaculty',
    });

  // Sorting
  let sortField = '-createdAt';
  if (query.sort) {
    sortField = query.sort as string;
  }
  const sortQuery = filterQuery.sort(sortField);

  // Pagination
  let limit: number = 1;
  let page: number = 1;
  let skip: number = 0;

  if (query.limit) {
    limit = Number(query.limit);
  }
  if (query.page) {
    page = Number(query.page);
    skip = (page - 1) * limit;
  }
  const paginationQuery = sortQuery.skip(skip);
  const limitQuery = paginationQuery.limit(limit);

  // Field Limiting
  let fields = '__v';
  if (query.fields) {
    fields = (query.fields as string).split(',').join(' ');
  }
  const fieldLimitQuery = await limitQuery.select(fields);
  return fieldLimitQuery;
};
const getStudentById = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  // const result = await StudentModel.aggregate([{ $match: { id: id } }]);
  if (!result) {
    throw new AppError(400, 'Student Doest not exist !!!');
  }
  return result;
};

//Update student by id
const updateStudentById = async (id: string, payload: Partial<TStudent>) => {
  const isExist = await StudentModel.isStudentExist(id);
  if (!isExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Student does not exist !!!');
  }
  const { name, localGuardian, guardian, ...restData } = payload;
  const modifiedData: Record<string, unknown> = {
    ...restData,
  };
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedData[`localGuardian.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedData[`guardian.${key}`] = value;
    }
  }
  const result = await StudentModel.findOneAndUpdate({ id }, modifiedData, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_MODIFIED, 'Student update failed !!!');
  }
  return result;
};
const deleteStudentById = async (id: string) => {
  const isExist = await StudentModel.isStudentExist(id);
  if (!isExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Student does not exist !!!');
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // transaction-1 : delete student
    const deletedStudent = await StudentModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to delete student !!!',
      );
    }

    //transaction-2 : delete user
    const deletedUser = await UserModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete User');
    }

    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
  }
};
export const studentServices = {
  getAllStudents,
  getStudentById,
  updateStudentById,
  deleteStudentById,
};
