import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { updateFacultyValidationSchema } from './faculty.validation';
import { facultyControllers } from './faculty.controller';

const router = express.Router();

router.route('/').get(facultyControllers.getAllFaculties);

router
  .route('/:id')
  .get(facultyControllers.getFacultyById)
  .patch(
    validateRequest(updateFacultyValidationSchema),
    facultyControllers.updateFacultyById,
  )
  .delete(facultyControllers.deleteFacultyById);

export const facultyRoutes = router;
