import {FC} from "react";
import {Link, useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/shadcn-ui/button.tsx";
import {Icons} from "@/components/common/icons.tsx";
import {useAuthStore} from "@/features/auth";
import {basic, BasicPayload} from "@/features/auth/schema.ts";
import {AuthProvider, ProviderCtor} from "@/services/security";

export const Login: FC = () => {
  // const store = useAuthStore();
  // const navigate = useNavigate();
  // // TODO: use register with inputs
  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const form = useForm<BasicPayload>({
  //   resolver: zodResolver(basic),
  // });
  //
  // const onEmailAndPassword: SubmitHandler<BasicPayload> = async ({
  //   email,
  //   password,
  // }) => {
  //   try {
  //     const user = await AuthProvider.signInWithEmailAndPassword(
  //       email,
  //       password
  //     );
  //     store.setUser(user.email!);
  //     navigate("/");
  //   } catch (e) {
  //     // TODO: notify err [shadcn-ui]
  //   }
  // };
  //
  // // HOC, to make onClick callback look prettier, but you can do it as usual too
  // const onProvider = (providerCtor: ProviderCtor) => {
  //   return async () => {
  //     try {
  //       const user = await AuthProvider.signInWithProvider(providerCtor);
  //       store.setUser(user.email!);
  //       navigate("/");
  //     } catch (e) {
  //       // TODO: notify err [shadcn-ui]
  //     }
  //   };
  // };
  //
  // // TODO: build the ui
  // // register email and password input
  // return (
  //   <div className="flex flex-col items-center justify-center gap-20">
  //     <h1>Login</h1>
  //   </div>
  // );
  return null;
};
