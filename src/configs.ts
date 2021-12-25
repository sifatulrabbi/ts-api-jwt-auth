import * as dotenv from "dotenv";

dotenv.config();

export const configs = {
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET || "Secret Key",
  ACCESS_TOKEN_LIFESPAN: 300,
  REFRESH_TOKEN_LIFESPAN: 60 * 60 * 24,
  MONGODB_URI: "mongodb://127.0.0.1:27017/practice-jwt-auth",
};
