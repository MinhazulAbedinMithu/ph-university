import { z } from 'zod';
import {
  AcademicSemesterCode,
  AcademicSemesterMonth,
  AcademicSemesterName,
} from './academicSemester.model';

const academicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum(AcademicSemesterName as [string, ...string[]]),
    code: z.enum(AcademicSemesterCode as [string, ...string[]]),
    year: z.string(),
    startMonth: z.enum(AcademicSemesterMonth as [string, ...string[]]),
    endMonth: z.enum(AcademicSemesterMonth as [string, ...string[]]),
  }),
});

export const academicSemesterValidations = {
  academicSemesterValidationSchema,
};
