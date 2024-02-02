import {z} from "zod";

export const profileEditSchema = z.object({
  first_name: z.string().min(5),
  last_name: z.string().min(5),
  username: z.string().min(4),
  birth_date: z.date().min(new Date(1992, 0 /* index-based month */)),
  sex: z.enum(["M", "F", "OTHER"]),
  bio: z.string().optional(),
  about: z.string().optional(),
});

export type ProfileEdit = z.infer<typeof profileEditSchema>;
