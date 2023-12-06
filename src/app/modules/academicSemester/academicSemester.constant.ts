import {
  TAcademicSemesterCode,
  TAcademicSemesterMonth,
  TAcademicSemesterName,
  TAcademicSemesterNameCodeMaper,
} from './academicSemester.interface';

export const AcademicSemesterMonth: TAcademicSemesterMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const AcademicSemesterName: TAcademicSemesterName[] = [
  'Autumn',
  'Summer',
  'Fall',
];
export const AcademicSemesterCode: TAcademicSemesterCode[] = ['01', '02', '03'];

export const AcademicSemesterNameCodeMaper: TAcademicSemesterNameCodeMaper = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};
