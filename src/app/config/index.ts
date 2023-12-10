import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.MONGODB_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  student_default_pass: process.env.STUDENT_DEFAULT_PASS,
  faculty_default_pass: process.env.FACULTY_DEFAULT_PASS,
  admin_default_pass: process.env.ADMIN_DEFAULT_PASS,
};
