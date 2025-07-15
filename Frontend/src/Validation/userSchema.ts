
import { z } from "zod";

export const signupSchema = z.object({
  firstName: z.string().trim().min(3, "first must be 3+ chars"),
  lastName: z.string().trim(),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signinSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});