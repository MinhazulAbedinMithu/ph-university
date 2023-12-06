import { Schema, model } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
  AcademicSemesterCode,
  AcademicSemesterMonth,
  AcademicSemesterName,
} from './academicSemester.constant';

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: AcademicSemesterName,
    },
    code: { type: String, required: true, enum: AcademicSemesterCode },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      required: true,
      enum: AcademicSemesterMonth,
    },
    endMonth: {
      type: String,
      required: true,
      enum: AcademicSemesterMonth,
    },
  },
  { timestamps: true },
);

// Check Semester is Exist or not
academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExist = await AcademicSemesterModel.find({
    year: this.year,
    name: this.name,
  });

  if (isSemesterExist.length) {
    throw new Error('Semester is already Exist !!!');
  }
  next();
});

export const AcademicSemesterModel = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
