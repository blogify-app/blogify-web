import {z} from "zod";

export const signupSchema = z.object({
  first_name: z.string().min(5),
  last_name: z.string().min(5),
  username: z.string().min(4),
  birth_date: z.date().min(new Date(1992, 0 /* index-based month */)),
  sex: z.enum(["M", "F", "OTHER"]),
  photo_url: z.string().url().optional(),
  profile_banner_url: z.string().url().optional(),
  bio: z.string().optional(),
  about: z.string().optional(),
  categories: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
    })
  ),
  provider_id: z.string().optional(),
  email: z.string().email(),
});

export const emailAndPasswordSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must contain at least 8 character(s)"),
});

export type Signup = z.infer<typeof signupSchema>;
export type EmailAndPassword = z.infer<typeof emailAndPasswordSchema>;
