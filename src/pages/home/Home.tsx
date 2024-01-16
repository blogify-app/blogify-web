import {FC} from "react";
import {useAuthStore} from "@/features/auth";

export const Home: FC = () => {
  const auth = useAuthStore();
  return (
    <div>
      <h1 className="text-5xl" data-testid="typo0">
        blogify-web works
      </h1>
      {auth.user ? <div>username: {auth.user}</div> : null}
    </div>
  );
};
