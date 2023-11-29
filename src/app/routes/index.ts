import { Router } from 'express';
import { userRoutes } from '../modules/user/user.route';
import { studentRoutes } from '../modules/student/student.route';

const router = Router();

const moduleRoutes = [
  { path: '/users', routes: userRoutes },
  { path: '/students', routes: studentRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.routes));

export default router;