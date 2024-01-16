import {FC} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAuthStore} from "@/features/auth";
import {basic, BasicPayload} from "@/features/auth/schema.ts";
import {AuthProvider, ProviderCtor} from "@/services/auth_provider.ts";
import {GoogleAuthProvider} from "firebase/auth";
import {useNavigate} from "react-router-dom";

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
    // use **AuthProvider** to create the _onProvider_
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

  // HOC, but you can also have a callback on **onClick** instead and call onProvider(...) as usual
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
