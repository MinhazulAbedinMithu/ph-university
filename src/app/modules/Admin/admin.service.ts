import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { UserModel } from '../user/user.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { searchableFeilds } from './admin.constant';
import { TAdmin } from './admin.interface';
import { AdminModel } from './admin.model';

const getAllAdmins = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(AdminModel.find(), query)
    .search(searchableFeilds)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await adminQuery.modelQuery;
  return result;
};
const getAdminById = async (id: string) => {
  const result = await AdminModel.findById(id);
  if (!result) {
    throw new AppError(400, 'Admin Doest not exist !!!');
  }
  return result;
};

//Update Admin by id
const updateAdminById = async (id: string, payload: Partial<TAdmin>) => {
  const isExist = await AdminModel.isAdminExist(id);
  if (!isExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Admin does not exist !!!');
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
  const result = await AdminModel.findByIdAndUpdate(id, modifiedData, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_MODIFIED, 'Admin update failed !!!');
  }
  return result;
};
const deleteAdminById = async (id: string) => {
  const isExist = await AdminModel.isAdminExist(id);
  if (!isExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Admin does not exist !!!');
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // transaction-1 : delete student
    const deletedAdmin = await AdminModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Admin !!!');
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
    return deletedAdmin;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Admin');
  }
};
export const adminServices = {
  getAllAdmins,
  getAdminById,
  updateAdminById,
  deleteAdminById,
};
