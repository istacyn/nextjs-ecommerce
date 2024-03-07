import { object, string } from "zod";

const envSchema = object({
  DATABASE_URL: string().min(1),
  GOOGLE_CLIENT_ID: string().min(1),
  GOOGLE_CLIENT_SECRET: string().min(1),
  NEXTAUTH_URL: string().min(1),
  NEXTAUTH_SECRET: string().min(1),
});

export const env = envSchema.parse(process.env);
