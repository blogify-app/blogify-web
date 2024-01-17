import {FC} from "react";
import {Reader} from "@/features/wisiwig";

export const Home: FC = () => (
  <div>
    <Reader className="w-2/3">
      {[
        "# Blogify web",
        "A blogging app for students.",
        "## Why ?",
        "* It is **PRETTY**",
        "* ... Why not?\n",
        "```js",
        'console.log("C\'mon ... Why not??")',
        "```",
      ].join("\n")}
    </Reader>
  </div>
);
