import {z} from "zod";

export const login = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const user = z.object({
  email: z.string().email(),
  username: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  bio: z.string() 
})

export type BasicPayload = z.infer<typeof login>;
