import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needPasswordChange: { type: Boolean, default: true },
    role: {
      type: String,
      enum: ['student', 'faculty', 'admin'],
    },
    status: {
      type: String,
      enum: {
        values: ['in-progress', 'blocked'],
        message: '{VALUE} is not a valid activity status',
      },
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});
userSchema.post('save', function (doc, next) {
  doc.password = 'hidden';

  next();
});

export const UserModel = model('User', userSchema);
