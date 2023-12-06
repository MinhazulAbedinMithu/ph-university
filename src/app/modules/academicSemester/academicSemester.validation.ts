import { z } from 'zod';
import {
  AcademicSemesterCode,
  AcademicSemesterMonth,
  AcademicSemesterName,
} from './academicSemester.constant';

const academicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum(AcademicSemesterName as [string, ...string[]]).optional(),
    code: z.enum(AcademicSemesterCode as [string, ...string[]]).optional(),
    year: z.string().optional(),
    startMonth: z
      .enum(AcademicSemesterMonth as [string, ...string[]])
      .optional(),
    endMonth: z.enum(AcademicSemesterMonth as [string, ...string[]]).optional(),
  }),
});

export const academicSemesterValidations = {
  academicSemesterValidationSchema,
};
