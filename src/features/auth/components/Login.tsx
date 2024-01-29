import {FC} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {GoogleAuthProvider} from "firebase/auth";
import {Link, useNavigate} from "react-router-dom";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAuthStore} from "@/features/auth";
import {LoginUser, loginUser} from "@/features/auth/schema.ts";
import {AuthProvider, ProviderCtor} from "@/services/security/auth_provider";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/shadcn-ui/form";
import {Input} from "@/components/shadcn-ui/input";
import {Button} from "@/components/shadcn-ui/button";

export const Login: FC = () => {
  const store = useAuthStore();
  const navigate = useNavigate();
  // TODO: use register with inputs
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const onEmailAndPassword: SubmitHandler<LoginUser> = async ({
    email,
    password,
  }) => {
    try {
      const user = await AuthProvider.signInWithEmailAndPassword(
        email,
        password
      );
      store.setUser(user.email!);
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
        store.setUser(user.email!);
        navigate("/");
      } catch (e) {
        // TODO: notify err [shadcn-ui]
      }
    };
  };

  const form = useForm<LoginUser>({
    resolver: zodResolver(loginUser),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // TODO: build the ui
  // register email and password input
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800 sm:p-6 md:p-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onEmailAndPassword)}
            data-testid="login-form"
            className="space-y-6 justify-self-center"
          >
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              Sign in to{" "}
              <label className="font-dancing-script text-3xl font-bold">
                Blogify
              </label>
            </h5>
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>email</FormLabel>
                  <FormControl>
                    <Input
                      data-testid="email-field"
                      placeholder="email@gmail.com"
                      {...field}
                      {...form.register("email")}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({field}) => (
                <FormItem className="mb-5">
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input
                      data-testid="password-field"
                      type="password"
                      placeholder="******"
                      {...field}
                      {...form.register("password")}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button onClick={onProvider(GoogleAuthProvider)}>Sign-in</Button>
            <Link
              to="/signup"
              className="me-2 ml-2 inline-flex items-center justify-center rounded border border-blue-400 bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800 hover:bg-blue-200 dark:bg-gray-700 dark:text-blue-400 rtl:ml-0"
            >
              create account ?
            </Link>
          </form>
        </Form>
      </div>
    </div>
  );
};
