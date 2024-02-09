import {z} from "zod";

const checkIfAtLeast14 = (birthDate: Date) => {
  const diff = new Date(new Date().getTime() - birthDate.getTime());
  return diff.getUTCFullYear() - 1970 >= 14;
};

export const signupSchema = z.object({
  first_name: z.string().min(5),
  last_name: z.string().min(5),
  username: z.string().min(4),
  birth_date: z.date().refine((value) => checkIfAtLeast14(value), {
    message: "You must be at least 14 years old to sign up.",
  }),
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
