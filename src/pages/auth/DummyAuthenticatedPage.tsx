import {FC} from "react";
import {Authenticated, useAuthStore} from "@/features/auth";
import {AuthProvider} from "@/services/security";

export const DummyAuthenticatedPage: FC = () => {
  const store = useAuthStore();

  return (
    <Authenticated>
      <h1>Connected</h1>
      <button
        onClick={async () => {
          await AuthProvider.logout();
          store.nullify();
          window.location.reload();
        }}
      >
        logout
      </button>
    </Authenticated>
  );
};
