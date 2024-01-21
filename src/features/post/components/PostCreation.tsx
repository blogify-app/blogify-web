import {FC} from "react";
import {Button} from "@/components/shadcn-ui/button";
import {Textarea} from "@/components/shadcn-ui/textarea";
import {useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn-ui/select";
import {zodResolver} from "@hookform/resolvers/zod";
import {post} from "../schema";

interface PostData {
  category: string;
  content: string;
}

export const PostCreation: FC = () => {
  const {postId} = useParams();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<PostData>({
    resolver: zodResolver(post),
  });

  const onSubmit = (data: PostData) => {
    console.log({
      id: postId,
      category: data.category,
      content: data.content,
    });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-96 rounded bg-white p-8 shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold">Créer un Post</h2>
        <div className="mb-4">
          <Select>
            <SelectTrigger className="w-full" {...register("category")}>
              <SelectValue placeholder="Sélectionner une catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="est">Romantique</SelectItem>
                <SelectItem value="cst">Science</SelectItem>
                <SelectItem value="mst">Technologie</SelectItem>
                <SelectItem value="pst">Langue</SelectItem>
                <SelectItem value="akst">Voyage</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-red-300">{errors.category.message}</p>
          )}
        </div>
        <div className="mb-4">
          <Textarea
            placeholder="Que voulez-vous partager ?"
            className="w-full"
            {...register("content")}
          />
          {errors.content && (
            <p className="text-red-300">{errors.content.message}</p>
          )}
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={handleSubmit(onSubmit)}
        >
          Publier
        </Button>
      </div>
    </div>
  );
};
