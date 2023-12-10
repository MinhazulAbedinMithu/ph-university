import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { adminControllers } from './admin.controller';
import { updateAdminValidationSchema } from './admin.validation';

const router = express.Router();

router.route('/').get(adminControllers.getAllAdmins);

router
  .route('/:id')
  .get(adminControllers.getAdminById)
  .patch(
    validateRequest(updateAdminValidationSchema),
    adminControllers.updateAdminById,
  )
  .delete(adminControllers.deleteAdminById);

export const adminRoutes = router;
