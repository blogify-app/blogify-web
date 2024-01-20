import {z} from "zod";

export const loginUser = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const registerUser = z.object({
  email: z.string().email(),
  username: z.string(),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  bio: z.string().optional(),
  sex: z.string(),
  birthdate: z.date(),
  password: z.string(),
});

export type LoginUser = z.infer<typeof loginUser>;
export type RegisterUser = z.infer<typeof registerUser>;
