import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(1),
  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string",
      min_length: 1,
    }),
  date: z.string().datetime().optional(),
});


// export const registerSchema = z.object({
//   username: z
//     .string({ required_error: "Username is required" })
//     .min(6, { message: "Username must be at least 6 characters long" }),
//   email: z.string({ required_error: "Email is required" }).email({
//     message: "Invalid email",
//   }),
//   password: z
//     .string({ required_error: "Password is required" })
//     .min(6, { message: "Password must be at least 6 characters long" }),
// });