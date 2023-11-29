import { z, ZodError } from 'zod';

// Define the Zod schema for studentName
const studentNameSchema = z.object({
  firstName: z.string().min(1).max(20).trim(),
  middleName: z.string(),
  lastName: z.string().min(1),
});

// Define the Zod schema for guardian
const guardianSchema = z.object({
  fatherName: z.string().min(1),
  fatherOccupation: z.string().min(1),
  motherName: z.string().min(1),
  motherOccupation: z.string().min(1),
});

// Define the Zod schema for localGuardian
const localGuardianSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  contactNo: z.string().min(1),
  address: z.string().min(1),
});

// Define the Zod schema for the student
export const studentValidationSchema = z.object({
  id: z.string(),
  name: studentNameSchema,
  gender: z.enum(['male', 'female']),
  dateOfBirth: z.string(),
  email: z.string().email(),
  contactNo: z.string(),
  emergencyContactNo: z.string(),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImage: z.string().optional(),
});
