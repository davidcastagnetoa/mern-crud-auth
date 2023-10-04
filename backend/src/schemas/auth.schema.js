import { z } from "zod";

// prettier-ignore
export const registerSchema = z.object({
  firstName: z
    .string({ required_error: "First name is required" })
    .min(2, { message: "First name must be at least 2 characters long" }),

  lastName: z
    .string({ required_error: "Last name are required" })
    .min(2, { message: "Last name must be at least 2 characters long" }),

  language: z.string({ required_error: "Language is required" }),

  birthDate: z.date({ required_error: "Birthdate is required" }),

  city: z.string({ required_error: "City is required" }),

  country: z.string({ required_error: "Country is required" }),

  avatar: z
    .string({ required_error: "Avatar is required" })
    .refine((value) => value.startsWith("http://") || value.startsWith("https://"), {
      message: "Avatar must be a valid URL",
    }),

  username: z
    .string({ required_error: "Username is required" })
    .min(6, { message: "Username must be at least 6 characters long" }),

  email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" }),

  confirmPassword: z
    .string({ required_error: "Confirm Password is required" })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Asegurate que las contraseñas coincidan",
    }),
});

export const loginSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" }),
});
