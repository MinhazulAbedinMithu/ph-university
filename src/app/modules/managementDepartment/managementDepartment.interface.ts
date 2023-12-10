import { Types } from 'mongoose';

export type TManagementDepartment = {
  name: string;
  managementFaculty: Types.ObjectId;
  isDeleted: boolean;
};
