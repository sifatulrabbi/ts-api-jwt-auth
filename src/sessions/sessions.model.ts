import { Schema, model } from "mongoose";
import { IRefreshToken } from "../typings";

const sessionsSchema = new Schema<IRefreshToken>({
  token: { type: String, required: true },
  in_at: { type: Number, required: true },
  exp_at: { type: Number, required: true },
});

export const sessionsModel = model("sessions", sessionsSchema);
