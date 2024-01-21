import * as z from "zod";

export const post = z.object({
  title: z.string().min(1, {message: "Le titre du post ne peut pas être vide"}),
  category: z.string().min(1, {message: "Veuillez sélectionner une catégorie"}),
  content: z
    .string()
    .min(1, {message: "Le contenu du post ne peut pas être vide"}),
});

export type PostPayload = z.infer<typeof post>;
