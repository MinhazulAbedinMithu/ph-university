import { Router } from 'express';
import { academicSemesterController } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterValidations } from './academicSemester.validation';

const router = Router();

router
  .route('/create-academic-semester')
  .post(
    validateRequest(
      academicSemesterValidations.academicSemesterValidationSchema,
    ),
    academicSemesterController.createAcademicSemester,
  );

router.route('/').get(academicSemesterController.getAcademicSemesters);
router
  .route('/:id')
  .get(academicSemesterController.getAcademicSemester)
  .patch(academicSemesterController.updateAcademicSemester);

export const academicSemesterRoutes = router;
