export type TErrorSourses = {
  path: string | number;
  message: string;
}[];

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorSourses: TErrorSourses;
};
