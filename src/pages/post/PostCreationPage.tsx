import {FC} from "react";
import {Button} from "@/components/shadcn-ui/button";
import {Textarea} from "@/components/shadcn-ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn-ui/select";

export const PostCreationPage: FC = () => {
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
