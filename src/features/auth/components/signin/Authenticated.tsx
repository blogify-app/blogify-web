import {FC, PropsWithChildren, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {AuthProvider} from "@/services/auth_provider.ts";

// HOC
export const Authenticated: FC<PropsWithChildren> = ({children}) => {
  const navigate = useNavigate();

  useEffect(() => {
    void AuthProvider.getCurrentUser().then((user) => {
      if (!user) {
        navigate("/login");
      }
    });
  }, [navigate]);

  // TODO: we will add loading while checking is_auth to avoid glitch-like screen!
  return children;
};
