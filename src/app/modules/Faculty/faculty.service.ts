import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { UserModel } from '../user/user.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { FacultyModel } from './faculty.model';
import { searchableFeilds } from './faculty.constant';
import { TFaculty } from './faculty.interface';

const getAllFaculties = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(FacultyModel.find(), query)
    .search(searchableFeilds)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await facultyQuery.modelQuery;
  return result;
};
const getFacultyById = async (id: string) => {
  const result = await FacultyModel.findById(id);
  if (!result) {
    throw new AppError(400, 'Faculty Doest not exist !!!');
  }
  return result;
};

//Update Faculty by id
const updateFacultyById = async (id: string, payload: Partial<TFaculty>) => {
  const isExist = await FacultyModel.isFacultyExist(id);
  if (!isExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Faculty does not exist !!!');
  }
  const { name, ...restData } = payload;
  const modifiedData: Record<string, unknown> = {
    ...restData,
  };
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value;
    }
  }
  const result = await FacultyModel.findByIdAndUpdate(id, modifiedData, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_MODIFIED, 'Faculty update failed !!!');
  }
  return result;
};
const deleteFacultyById = async (id: string) => {
  const isExist = await FacultyModel.isFacultyExist(id);
  if (!isExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Faculty does not exist !!!');
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // transaction-1 : delete student
    const deletedFaculty = await FacultyModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedFaculty) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to delete Faculty !!!',
      );
    }

    //transaction-2 : delete user
    const deletedUser = await UserModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete User');
    }

    await session.commitTransaction();
    await session.endSession();
    return deletedFaculty;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Faculty');
  }
};
export const facultyServices = {
  getAllFaculties,
  getFacultyById,
  updateFacultyById,
  deleteFacultyById,
};
