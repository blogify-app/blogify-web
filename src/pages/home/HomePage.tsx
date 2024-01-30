import {FC} from "react";
import {NavLink} from "react-router-dom";
import {Button} from "@/components/shadcn-ui/button";
import {useAuthStore} from "@/features/auth";
import {Reader} from "@/features/wisiwig";
import {AuthProvider} from "@/services/security";

export const HomePage: FC = () => {
  const auth = useAuthStore();

  // NOTE: @example
  const logout = async () => {
    try {
      await AuthProvider.logout();
      auth.nullify();
    } catch (e) {
      /* TODO: handle err */
    }
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
      </div>
    </div>
  );
};
