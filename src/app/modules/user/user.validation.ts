import { z } from 'zod';

const userValidationSchema = z.object({
  // id: z.string({ invalid_type_error: 'Name must be a string' }),
  password: z
    .string({ invalid_type_error: 'Password must be a string' })
    .max(20, { message: 'Password must be less than 20 characters' })
    .min(6, { message: 'Password must be greater than 6 characters' }),

  // needPasswordChange: z.boolean().optional().default(true),
  // role: z.enum(['admin', 'student', 'faculty']),
  // status: z.enum(['in-progress', 'blocked']).default('in-progress'),
  // isDeleted: z.boolean().optional().default(false),
});

export const userValidation = {
  userValidationSchema,
};
