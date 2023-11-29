import express from 'express';
import { studentControllers } from './student.controller';

const router = express.Router();

router.route('/').get(studentControllers.getAllStudents);

router
  .route('/:id')
  .get(studentControllers.getStudentById)
  .delete(studentControllers.deleteStudentById);

export const studentRoutes = router;
