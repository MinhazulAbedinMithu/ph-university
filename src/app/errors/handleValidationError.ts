import {
  TErrorSourses,
  TGenericErrorResponse,
} from './../interface/error.interface';
import mongoose from 'mongoose';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const errorSourses: TErrorSourses = Object.values(err.errors).map(
    (value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: value?.path,
        message: value?.message,
      };
    },
  );
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorSourses,
  };
};
export default handleValidationError;
