import {FC} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAuthStore} from "@/features/auth";
import {LoginUser, loginUser} from "@/features/auth/schema.ts";
import {AuthProvider, ProviderCtor} from "@/services/auth_provider.ts";
import {GoogleAuthProvider} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/shadcn-ui/form";
import {z} from "zod";
import {Input} from "@/components/shadcn-ui/input";

export const Login: FC = () => {
  const store = useAuthStore();
  const navigate = useNavigate();
  // TODO: use register with inputs
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {register: _register, handleSubmit} = useForm<LoginUser>({
    resolver: zodResolver(loginUser),
  });

  const onEmailAndPassword: SubmitHandler<LoginUser> = async ({
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

  const form = useForm<z.infer<typeof loginUser>>({
    resolver: zodResolver(loginUser),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // TODO: build the ui
  // register email and password input
  return (
    <form
      {...form}
      onSubmit={handleSubmit(onEmailAndPassword)}
      className="mx-auto max-w-sm"
    >
      <FormField
        control={form.control}
        name="email"
        render={({field}) => (
          <FormItem>
            <FormLabel className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              email
            </FormLabel>
            <FormControl>
              <Input
                placeholder="email"
                {...field}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({field}) => (
          <FormItem>
            <FormLabel className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              password
            </FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="password"
                {...field}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </FormControl>
          </FormItem>
        )}
      />
      <button onClick={onProvider(GoogleAuthProvider)}>google</button>
    </form>
  );
};
