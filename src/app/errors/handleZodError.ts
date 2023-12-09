import { ZodError, ZodIssue } from 'zod';
import {
  TErrorSourses,
  TGenericErrorResponse,
} from '../interface/error.interface';

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const statusCode = 400;
  const errorSourses: TErrorSourses = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  return {
    statusCode,
    message: 'Validation Error',
    errorSourses,
  };
};
export default handleZodError;
