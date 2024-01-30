import {FC} from "react";
import {Home} from "@/features/home/components";

export const HomePage: FC = () => {
  return (
    <div>
      <div>
        <Home />
      </div>

      <div className="px-4"></div>
    </div>
  );
};
