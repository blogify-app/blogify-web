import {FC} from "react";
import {useAuthStore} from "@/features/auth";
import {Reader} from "@/features/wisiwig";
import {Button} from "@/components/shadcn-ui/button";
import {AuthProvider} from "@/services/auth_provider";
import {NavLink, useNavigate} from "react-router-dom";
import {v4 as uuidv4} from "uuid";

export const HomePage: FC = () => {
  const auth = useAuthStore();
  const navigate = useNavigate();

  // NOTE: @example
  const logout = async () => {
    try {
      await AuthProvider.logOut();
      auth.setUser(null);
    } catch (e) {
      /* TODO: handle err */
    }
  };

  const createNewPost = () => {
    const newPostId = uuidv4();
    navigate(`/posts/new/${newPostId}`);
  };

  return (
    <div>
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

      <div className="px-4">
        <Reader className="px-0">
          {[
            "## Connected user",
            auth.user ? `**${auth.user}**` : "_None_",
          ].join("\n")}
        </Reader>

        <Button onClick={logout}>Logout</Button>
        <NavLink to="/login">
          <Button variant="link">Login</Button>
        </NavLink>
        <Button onClick={createNewPost}>New Post</Button>
      </div>
    </div>
  );
};
