import express from 'express';
import { studentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { updateStudentValidationSchema } from './student.validation';

const router = express.Router();

router.route('/').get(studentControllers.getAllStudents);

router
  .route('/:id')
  .get(studentControllers.getStudentById)
  .patch(
    validateRequest(updateStudentValidationSchema),
    studentControllers.updateStudentById,
  )
  .delete(studentControllers.deleteStudentById);

export const studentRoutes = router;
