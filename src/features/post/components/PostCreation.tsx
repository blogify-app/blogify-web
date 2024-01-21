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
    <div className="flex h-screen w-screen items-center justify-center bg-white">
      <div className="h-4/5 w-full rounded bg-white p-8  md:w-2/3">
        <h2 className="mb-4 text-2xl font-semibold">Créer un Post</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="mb-4 flex items-center">
            <Select {...register("category")} defaultValue="">
              <SelectTrigger className="mx-1/4 w-1/4">
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
            <Button
              type="submit"
              className="mx-4 w-1/6 bg-green-600 hover:bg-gray-500"
            >
              Publier
            </Button>
          </div>
          <div className="mb-4">
            <Textarea
              placeholder="Que voulez-vous partager ?"
              {...register("content")}
              className="h-48 w-full resize-none border-0 text-xl font-semibold text-gray-600 focus:ring-0 focus:!ring-transparent focus-visible:ring-0"
            />
            {errors.content && (
              <p className="text-red-300">{errors.content.message}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
