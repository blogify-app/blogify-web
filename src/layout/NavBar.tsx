import {FC} from "react";
import {useAuthStore} from "@/features/auth";
import {AuthenticatedHeader} from "./AuthenticatedHeader";
import {
  AnonymousHeader,
  AnonymousHeaderProps as NavBarProps,
} from "./AnonymousHeader";

export const NavBar: FC<NavBarProps> = ({page}) => {
  const {user} = useAuthStore();

  return user ? <AuthenticatedHeader /> : <AnonymousHeader page={page} />;
};
