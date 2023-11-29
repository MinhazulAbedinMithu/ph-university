export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TUser = {
  id: string;
  password: string;
  needPasswordChange: boolean;
  role: 'admin' | 'faculty' | 'student';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};
