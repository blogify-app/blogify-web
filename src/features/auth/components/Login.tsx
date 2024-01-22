import {FC} from "react";
import {useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {GoogleAuthProvider} from "firebase/auth";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAuthStore} from "@/features/auth";
import {LoginUser, loginUser} from "@/features/auth/schema.ts";
import {AuthProvider, ProviderCtor} from "@/services/auth_provider.ts";
import {GoogleAuthProvider} from "firebase/auth";
import {Link, useNavigate} from "react-router-dom";
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

  const form = useForm<z.infer<typeof loginUser>>({
    resolver: zodResolver(loginUser),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const moveToCreateAccount = () => {
    navigate("/signup");
  };

  // TODO: build the ui
  // register email and password input
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800 sm:p-6 md:p-8">
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onEmailAndPassword)}
            className="space-y-6 justify-self-center"
          >
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              Sign in to{" "}
              <label
                htmlFor=""
                className="font-dancing-script text-3xl font-bold"
              >
                Blogify
              </label>
            </h5>
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem className="mb-5">
                  <FormLabel className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email@gmail.com"
                      {...field}
                      {..._register("email")}
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
                <FormItem className="mb-5">
                  <FormLabel className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="******"
                      {...field}
                      {..._register("password")}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <button
              className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 dark:focus:ring-blue-800 sm:w-auto"
              onClick={onProvider(GoogleAuthProvider)}
            >
              Sign-in
            </button>
            <Link
              to="/signup"
              onClick={moveToCreateAccount}
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
