import {FC} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {GoogleAuthProvider} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAuthStore} from "@/features/auth";
import {basic, BasicPayload} from "@/features/auth/schema.ts";
import {AuthProvider, ProviderCtor} from "@/services/security";

export const Login: FC = () => {
  const store = useAuthStore();
  const navigate = useNavigate();
  // TODO: use register with inputs
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {register: _register, handleSubmit} = useForm<BasicPayload>({
    resolver: zodResolver(basic),
  });

  const onEmailAndPassword: SubmitHandler<BasicPayload> = async ({
    email,
    password,
  }) => {
    try {
      const user = await AuthProvider.signInWithEmailAndPassword(
        email,
        password
      );
      store.setUser(user.username);
      navigate("/");
    } catch (e) {
      // TODO: notify err [shadcn-ui]
    }
  };

  // HOC, to make onClick callback look prettier, but you can do it as usual too
  const onProvider = (providerCtor: ProviderCtor) => {
    return async () => {
      try {
        const user = await AuthProvider.signInWithProvider(providerCtor);
        store.setUser(user.username);
        navigate("/");
      } catch (e) {
        // TODO: notify err [shadcn-ui]
      }
    };
  };

  // TODO: build the ui
  // register email and password input
  return (
    <form onSubmit={handleSubmit(onEmailAndPassword)}>
      {/* TODO: form inputs */}
      <button onClick={onProvider(GoogleAuthProvider)}>google</button>
    </form>
  );
};
