import {FC, useEffect} from "react";
import {Button} from "@/components/shadcn-ui/button";
import {Textarea} from "@/components/shadcn-ui/textarea";
import {useNavigate} from "react-router-dom";
import {v4 as uuidv4} from "uuid";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn-ui/select";

export const PostCreationPage: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const postId = uuidv4() as string;
    navigate(`/posts/new/${postId}`);
  }, [navigate]);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-96 rounded bg-white p-8 shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold">Créer un Post</h2>
        <div className="mb-4">
          <Select>
            <SelectTrigger className="w-full">
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
        </div>
        <div className="mb-4">
          <Textarea
            placeholder="Que voulez-vous partager ?"
            className="w-full"
          />
        </div>
        <Button variant="outline" className="w-full">
          Publier
        </Button>
      </div>
    </div>
  );
};
