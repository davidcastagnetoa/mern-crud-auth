import { z } from "zod";

// prettier-ignore
export const registerSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(6, { message: "Username must be at least 6 characters long" }),

  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" }),

  confirmPassword: z
    .string({ required_error: "Confirm Password is required" })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Asegurate que las contraseñas coincidan",
      // path: ["confirmPassword"], // this will put the error at fields.confirmPassword
    }),
});

export const loginSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" }),
});
