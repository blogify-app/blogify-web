import {FC} from "react";
import {Reader} from "@/features/wisiwig";

export const PostCreationPage: FC = () => {
  return (
    <div>
      <Reader className="w-2/3">
        {[
          "# Blogify web",
          "Want to create a new post, you'll have to wait",
        ].join("\n")}
      </Reader>
    </div>
  );
};
