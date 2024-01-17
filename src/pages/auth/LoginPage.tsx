import {Login} from "@/features/auth";
import {FC} from "react";

export const LoginPage: FC = () => {
  // it may also have some layout-ing but at the end, It'll always use its root from the corresponding feature
  return <Login />;
};
