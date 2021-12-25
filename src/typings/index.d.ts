import { Document } from "mongoose";

export interface IUser {
  _id?: string;
  username: string;
  password: string;
}

export type IUserDocument = IUser & Document;

export interface IRefreshToken {
  _id?: string;
  token: string;
  in_at: number;
  exp_at: number;
}

export type IRefreshTokenDoc = IRefreshToken & Document;
