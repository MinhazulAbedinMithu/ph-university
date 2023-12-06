import { z } from 'zod';

const createAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Faculty name must be string',
    }),
  }),
});

export const academicFacultyValidations = {
  createAcademicFacultyValidationSchema,
};
