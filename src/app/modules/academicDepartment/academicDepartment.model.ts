import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Department name is required'],
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: [true, 'Academic Faculty is required'],
      ref: 'AcademicFaculty',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

academicDepartmentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
academicDepartmentSchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

// check document exist or not
academicDepartmentSchema.pre('save', async function (next) {
  const isDeptExist = await AcademicDepartmentModel.findOne({
    name: this.name,
  });
  if (isDeptExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Academic Department already exist.',
    );
  }
  next();
});

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDeptExist = await AcademicDepartmentModel.findOne(query);
  if (!isDeptExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Academic Department does not exist.',
    );
  }
  next();
});

export const AcademicDepartmentModel = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
