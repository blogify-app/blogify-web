import {FC} from "react";
import {Home} from "@/features/home/components";
import {useAuthStore} from "@/features/auth";
import {Reader} from "@/features/wisiwig";
import {AuthProvider} from "@/services/security";
import {Button} from "@/components/shadcn-ui/button";

export const HomePage: FC = () => {

  return (
    <div>
      <div>
        <Home />
      </div>

      <div className="px-4">
      </div>
    </div>
  );
};
