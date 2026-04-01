import dotenv from "dotenv";
dotenv.config();

export const env = {
  MONGO_URI: process.env.MONGO_URI,
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  ACCESS_SECRET:process.env.ACCESS_SECRET,
  REFRESH_SECRET:process.env.REFRESH_SECRET,
  ACCESS_EXPIRES_IN:process.env.ACCESS_EXPIRES_IN,
  REFRESH_EXPIRES_IN:process.env.REFRESH_EXPIRES_IN,
};