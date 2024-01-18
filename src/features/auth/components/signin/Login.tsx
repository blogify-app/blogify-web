import {FC} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAuthStore} from "@/features/auth";
import {BasicPayload, login} from "@/features/auth/schema.ts";
import {AuthProvider, ProviderCtor} from "@/services/auth_provider.ts";
import {GoogleAuthProvider} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/shadcn-ui/form";
import { z } from "zod";
import { Input } from "@/components/shadcn-ui/input";

export const Login: FC = () => {
  const store = useAuthStore();
  const navigate = useNavigate();
  // TODO: use register with inputs
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {register: _register, handleSubmit} = useForm<BasicPayload>({
    resolver: zodResolver(login),
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

  const form = useForm<z.infer<typeof login>>({
    resolver: zodResolver(login),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  // TODO: build the ui
  // register email and password input
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onEmailAndPassword)}>
      <FormField
        control={form.control}
        name="password"
        render={({field}) => (
          <FormItem>
            <FormLabel>email</FormLabel>
            <FormControl>
              <Input placeholder="email" {...field}/>
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({field}) => (
          <FormItem>
            <FormLabel>email</FormLabel>
            <FormControl>
              <Input type="password" placeholder="password" {...field}/>
            </FormControl>
          </FormItem>
        )}
      />
      <button onClick={onProvider(GoogleAuthProvider)}>google</button>
    </form>
    </Form>
  );
};
