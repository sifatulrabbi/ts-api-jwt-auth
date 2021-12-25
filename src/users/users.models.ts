import * as mongoose from 'mongoose';
import { IUser } from '../typings';

const usersSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export const usersModel = mongoose.model('users', usersSchema);
