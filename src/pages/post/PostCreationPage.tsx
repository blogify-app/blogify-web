import {FC} from "react";
import {Button} from "@/components/shadcn-ui/button";
import {Textarea} from "@/components/shadcn-ui/textarea";

export const PostCreationPage: FC = () => {
  return (
    <div>
      <div className="grid w-80 gap-2">
        <Textarea placeholder="Que voulez-vous partagez ?" />
        <Button variant={"outline"}>Publier</Button>
      </div>
    </div>
  );
};
