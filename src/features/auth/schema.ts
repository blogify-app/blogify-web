import {z} from "zod";

export const basic = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type BasicPayload = z.infer<typeof basic>;
