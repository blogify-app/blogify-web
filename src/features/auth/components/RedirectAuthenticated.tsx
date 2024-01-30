import {FC, PropsWithChildren, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAuthStore} from "@/features/auth";

// HOC
export const RedirectAuthenticated: FC<PropsWithChildren> = ({children}) => {
  const store = useAuthStore();
  const navigate = useNavigate();

  const {user} = store;

  useEffect(() => {
    if (user) {
      navigate(`/users/${user.id}`);
    }
  }, [navigate, user]);

  return user ? null : children;
};
