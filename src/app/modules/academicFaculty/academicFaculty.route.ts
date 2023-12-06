import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicFacultyValidations } from './academicFaculty.validation';
import { academicFacultyControllers } from './academicFaculty.controller';

const router = Router();

router.post(
  '/create-academic-faculty',
  validateRequest(
    academicFacultyValidations.createAcademicFacultyValidationSchema,
  ),
  academicFacultyControllers.createAcademicFaculty,
);

router.get('/', academicFacultyControllers.getAllAcademicFaculty);
router
  .route('/:id')
  .get(academicFacultyControllers.getSingleAcademicFaculty)
  .patch(
    validateRequest(
      academicFacultyValidations.createAcademicFacultyValidationSchema,
    ),
    academicFacultyControllers.updateAcademicFaculty,
  )
  .delete(academicFacultyControllers.deleteAcademicFaculty);

export const academicFacultyRoutes = router;
