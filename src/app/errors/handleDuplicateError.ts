import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../interface/error.interface';

/**
 *
 *
 */
const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const statusCode = 400;
  const errorSourses = [
    {
      path: '',
      message: '',
    },
  ];
  return {
    statusCode,
    message: 'Duplicate Error!',
    errorSourses,
  };
};

export default handleDuplicateError;
