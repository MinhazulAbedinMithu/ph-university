import { Model, Types } from 'mongoose';

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
};
export type TLocalGuardian = {
  name: string;
  email: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  user: Types.ObjectId;
  password: string;
  name: TUserName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  admissionSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  isDeleted: boolean;
};

export type TStudentMethods = {
  isStudentExist(id: string): Promise<TStudent | null>;
};

export interface IStudentModel extends Model<TStudent> {
  isStudentExist(id: string): Promise<TStudent | null>;
}

// export type TStudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   TStudentMethods
// >;
