import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../interface/error.interface';

/**
 *
 *
 */
const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const statusCode = 400;
  const errorSourses = [
    {
      path: err.path,
      message: err.message,
    },
  ];
  return {
    statusCode,
    message: 'Invalid Id !',
    errorSourses,
  };
};

export default handleCastError;
