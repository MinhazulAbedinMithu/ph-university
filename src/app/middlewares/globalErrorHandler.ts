import { NextFunction, Request, Response } from 'express';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const defaultError = {
    statusCode: err.statusCode || 500,
    message: err.message || 'Something went wrong!!!',
  };
  return res.status(defaultError.statusCode).json({
    success: false,
    message: defaultError.message,
    error: err,
  });
};

export default globalErrorHandler;
