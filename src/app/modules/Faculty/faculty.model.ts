import { Model, Schema, model } from 'mongoose';
import { IFacultyModel, TFaculty, TUserName } from './faculty.interface';
import config from '../../config';

const facultyNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    maxlength: [20, 'firstname must be lower than 20 characters'],
    trim: true, // remove space
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
  },
});

const facultySchema = new Schema<TFaculty, IFacultyModel>(
  {
    id: {
      type: String,
      required: [true, 'Faculty ID is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      unique: true,
      required: [true, 'User id is required'],
      ref: 'User',
    },
    designation: {
      type: String,
      required: [true, 'Designation is required'],
      unique: true,
    },
    name: {
      type: facultyNameSchema,
      required: [true, 'Faculty name is required'],
    },
    gender: {
      type: String,
      required: [true, 'Gender is required'],
      enum: {
        values: ['male', 'female'],
        message: '{VALUE} is not a valid gender',
      },
    },

    dateOfBirth: {
      type: String,
      required: [true, 'Date of birth is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    contactNo: { type: String, required: [true, 'Contact number is required'] },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: '{VALUE} is not a valid blood group',
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },
    profileImg: { type: String },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicSemester',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicDepartment',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

//Create a custom static method
facultySchema.statics.isFacultyExist = async function (id: string) {
  const existingUser = await FacultyModel.findById(id);
  return existingUser;
};

// Create a custom instance method
// FacultySchema.methods.isFacultyExist = async function (id: string) {
//   const existingUser = await FacultyModel.findOne({ id });
//   return existingUser || null;
// };

// Query middleware
facultySchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

facultySchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
facultySchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// FacultySchema.virtual('fullName').get(function () {
//   return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
// });

export const FacultyModel = model<TFaculty, IFacultyModel>(
  'Faculty',
  facultySchema,
);
