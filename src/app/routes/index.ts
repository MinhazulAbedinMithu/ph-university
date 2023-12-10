import { Router } from 'express';
import { userRoutes } from '../modules/user/user.route';
import { studentRoutes } from '../modules/student/student.route';
import { academicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { academicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { facultyRoutes } from '../modules/Faculty/faculty.route';

const router = Router();

const moduleRoutes = [
  { path: '/users', routes: userRoutes },
  { path: '/faculties', routes: facultyRoutes },
  { path: '/students', routes: studentRoutes },
  { path: '/academic-semesters', routes: academicSemesterRoutes },
  { path: '/academic-faculties', routes: academicFacultyRoutes },
  { path: '/academic-departments', routes: academicDepartmentRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.routes));

export default router;
