import {FC} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {GithubAuthProvider, GoogleAuthProvider} from "firebase/auth";
import {Link} from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn-ui/form.tsx";
import {Button} from "@/components/shadcn-ui/button.tsx";
import {Icons} from "@/components/common/icons.tsx";
import {Input} from "@/components/shadcn-ui/input.tsx";
import {
  EmailAndPassword,
  emailAndPasswordSchema,
} from "@/features/auth/schema.ts";
import {useAuthStore} from "@/features/auth";
import {AuthProvider, loginWith, AuthWith} from "@/services/security";

export const Login: FC = () => {
  const store = useAuthStore();

  const login: AuthWith<void> = async (provider) => {
    try {
      await loginWith(provider);
      const whoami = await AuthProvider.login();
      store.setUser(whoami);
    } catch (e) {
      /* EMPTY */
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-20">
      <div className="flex flex-col items-center justify-center gap-[0.125rem]">
        <div className="text-4xl font-medium">Login</div>
        <p>
          Don't have an account yet ?{" "}
          <Button variant="link">
            <Link to="/signup">Sign up</Link>
          </Button>
        </p>
      </div>

      <LoginWith onLogin={login} />
    </div>
  );
};

interface LoginWithProps {
  onLogin: AuthWith<void>;
}

// TODO: refactor as it has the same structure as SignupWith
const LoginWith: FC<LoginWithProps> = ({onLogin}) => {
  const form = useForm<EmailAndPassword>({
    resolver: zodResolver(emailAndPasswordSchema),
  });

  return (
    <>
      <Form {...form}>
        <form
          className="flex w-[40rem] flex-col items-center justify-center space-y-6"
          onSubmit={form.handleSubmit(onLogin)}
        >
          <div className="w-full">
            <FormField
              name="email"
              control={form.control}
              render={({field}) => (
                <FormItem data-testid="email-field" className="text-md">
                  <FormLabel>Email</FormLabel>
                  <FormControl className="h-12">
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="h-auto w-full">
            <FormField
              name="password"
              control={form.control}
              render={({field}) => (
                <FormItem data-testid="password-field" className="text-md">
                  <FormLabel>Password</FormLabel>
                  <FormControl className="h-12">
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full">
            <Button
              data-testid="continue-login"
              className="h-12 w-full rounded-full"
              type="submit"
            >
              Continue
            </Button>
          </div>
        </form>
      </Form>

      <div className="flex w-[30rem] flex-col justify-center space-y-[1.5rem]">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">OR</span>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Button
            size="lg"
            variant="outline"
            onClick={() => void onLogin(GoogleAuthProvider)}
          >
            <Icons.google className="mr-2 h-4 w-4" /> Google
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => void onLogin(GithubAuthProvider)}
          >
            <Icons.gitHub className="mr-2 h-4 w-4" /> Github
          </Button>
        </div>
      </div>
    </>
  );
};
