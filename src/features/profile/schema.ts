import {z} from "zod";

export const profileEditSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  username: z.string(),
  sex: z.enum(["M", "F", "OTHER"]),
  bio: z.string().optional(),
  about: z.string().optional(),
  id: z.string().optional(),
});

export type ProfileEdit = z.infer<typeof profileEditSchema>;
