import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  MONGO_URI: z.string().min(1),
  PORT: z.coerce.number().default(5000),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  ACCESS_SECRET: z.string().min(1),
  REFRESH_SECRET: z.string().min(1),
  ACCESS_EXPIRES_IN: z.string().min(1).default("15m"),
  REFRESH_EXPIRES_IN: z.string().min(1).default("7d"),
  CLOUDINARY_CLOUD_NAME: z.string().min(1),
  CLOUDINARY_API_KEY: z.string().min(1),
  CLOUDINARY_API_SECRET: z.string().min(1),
  CLIENT_URL: z.string().url(),
  COOKIE_SAME_SITE: z.enum(["lax", "strict", "none"]).default("lax"),
});

export const env = envSchema.parse(process.env);
