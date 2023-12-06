import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicDepartmentValidations } from './academicDepartment.validation';
import { academicDepartmentControllers } from './academicDepartment.controller';

const router = Router();

router.post(
  '/create-academic-department',
  validateRequest(
    academicDepartmentValidations.createAcademicDepartmentValidationSchema,
  ),
  academicDepartmentControllers.createAcademicDepartment,
);

router.get('/', academicDepartmentControllers.getAllAcademicDepartment);
router
  .route('/:id')
  .get(academicDepartmentControllers.getSingleAcademicDepartment)
  .patch(
    validateRequest(
      academicDepartmentValidations.updateAcademicDepartmentValidationSchema,
    ),
    academicDepartmentControllers.updateAcademicDepartment,
  )
  .delete(academicDepartmentControllers.deleteAcademicDepartment);

export const academicDepartmentRoutes = router;
