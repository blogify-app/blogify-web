import {FC, memo} from "react";
import {Link} from "react-router-dom";
import {Button} from "@/components/shadcn-ui/button.tsx";

export interface AnonymousHeaderProps {
  page?: "sign_up" | "sign_in";
}

const AnonymousHeaderComponent: FC<AnonymousHeaderProps> = ({page}) => {
  return (
    <div className="mx-auto my-0 flex h-full w-[95%] items-center justify-between bg-white">
      <div className="logo w-30 h-15 col-span-1">
        <a
          href="#"
          data-testid="blogify-logo"
          className="text-4xl font-bold tracking-tight"
        >
          BLOGIFY
        </a>
      </div>
      <div data-testid="auth-button" className="space-x-3">
        {page === "sign_up" && (
          <Button variant="outline" size="lg" className="h-9" asChild>
            <Link to="/login">Sign in</Link>
          </Button>
        )}
        {page === "sign_in" && (
          <Button size="lg" className="h-9" asChild>
            <Link to="/signup">Sign up</Link>
          </Button>
        )}

        {!page && (
          <>
            <Button variant="outline" size="lg" className="h-9" asChild>
              <Link to="/login">Login</Link>
            </Button>

            <Button size="lg" className="h-9" asChild>
              <Link to="/signup">Sign up</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export const AnonymousHeader = memo(AnonymousHeaderComponent);
