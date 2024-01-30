import {FC} from "react";
import {Link, useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {format} from "date-fns";
import {CalendarIcon} from "lucide-react";
import {GoogleAuthProvider, GithubAuthProvider} from "firebase/auth";
import {nanoid} from "nanoid";
import {Button} from "@/components/common/button.tsx";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn-ui/form.tsx";
import {Calendar} from "@/components/shadcn-ui/calendar.tsx";
import {Textarea} from "@/components/shadcn-ui/textarea.tsx";
import {StepperView, useStepperContext} from "@/components/common/stepper.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn-ui/popover.tsx";
import {Icons} from "@/components/common/icons.tsx";
import {Input} from "@/components/shadcn-ui/input.tsx";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/shadcn-ui/radio-group.tsx";
import {
  EmailAndPassword,
  emailAndPasswordSchema,
  type Signup as User,
  signupSchema,
} from "@/features/auth/schema.ts";
import {RedirectAuthenticated, useAuthStore} from "@/features/auth";
import {
  AuthProvider,
  AuthWith,
  getCachedAuth,
  registerWith,
} from "@/services/security";
import {cn} from "@/lib/utils.ts";
import {useLoading} from "@/hooks";

export const Signup: FC = () => {
  const authStore = useAuthStore();
  const navigate = useNavigate();
  const stepper = useStepperContext();
  const {queue, isLoading} = useLoading("signup");

  const stepNext = () => {
    stepper.nextStep();
  };

  const signup: AuthWith<void> = async (provider) => {
    try {
      await queue(() => registerWith(provider));
      stepNext();
    } catch (e) {
      // TODO: handle error
      console.error(e);
    }
  };

  const createUser: SubmitHandler<User> = async (user) => {
    try {
      const whoami = await queue(() => {
        user.email = getCachedAuth().email || user.email;
        return AuthProvider.register({
          ...(user as any),
          id: nanoid(),
        });
      });
      authStore.setUser(whoami);
      navigate(`/users/${whoami.id}`);
    } catch (e) {
      // TODO: handle error
      console.error(e);
    }
  };

  return (
    <RedirectAuthenticated>
      <div className="flex flex-col items-center justify-center gap-20">
        <div className="flex flex-col items-center justify-center gap-[0.125rem]">
          <div className="text-4xl font-medium">Create an account</div>
          <p>
            Already have an account ?{" "}
            <Button variant="link">
              <Link to="/login">Login</Link>
            </Button>
          </p>
        </div>

        <StepperView step="signup-with">
          <SignupWith onSignup={signup} isLoading={isLoading} />
        </StepperView>

        <StepperView step="user-info">
          <SignupUserForm onCreate={createUser} isLoading={isLoading} />
        </StepperView>
      </div>
    </RedirectAuthenticated>
  );
};

interface SignupWithProps {
  onSignup: AuthWith<void>;
  isLoading: boolean;
}

const SignupWith: FC<SignupWithProps> = ({onSignup, isLoading}) => {
  const form = useForm<EmailAndPassword>({
    resolver: zodResolver(emailAndPasswordSchema),
  });

  return (
    <>
      <Form {...form}>
        <form
          className="flex w-[40rem] flex-col items-center justify-center space-y-6"
          onSubmit={form.handleSubmit(onSignup)}
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
              data-testid="continue-signup"
              className="h-12 w-full rounded-full"
              type="submit"
              isLoading={isLoading}
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
            onClick={() => void onSignup(GoogleAuthProvider)}
          >
            <Icons.google className="mr-2 h-4 w-4" /> Google
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => void onSignup(GithubAuthProvider)}
          >
            <Icons.gitHub className="mr-2 h-4 w-4" /> Github
          </Button>
        </div>
      </div>
    </>
  );
};

interface SignupUserFormProps {
  onCreate(user: User): void;
  isLoading: boolean;
}

const SignupUserForm: FC<SignupUserFormProps> = ({onCreate, isLoading}) => {
  const form = useForm<User>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      categories: [],
      // bind cached email to the to-be registered user
      email: getCachedAuth().email ?? "",
    },
  });

  return (
    <Form {...form}>
      <form
        className="mb-6 flex w-[40rem] flex-col items-center justify-center space-y-6"
        onSubmit={form.handleSubmit(onCreate)}
      >
        <div className="w-full">
          <FormField
            name="first_name"
            control={form.control}
            render={({field}) => (
              <FormItem className="text-md">
                <FormLabel>First name</FormLabel>
                <FormControl className="h-12">
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full">
          <FormField
            name="last_name"
            control={form.control}
            render={({field}) => (
              <FormItem className="text-md">
                <FormLabel>Last name</FormLabel>
                <FormControl className="h-12">
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full">
          <FormField
            name="username"
            control={form.control}
            render={({field}) => (
              <FormItem className="text-md">
                <FormLabel>User name</FormLabel>
                <FormControl className="h-12">
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full">
          <FormField
            control={form.control}
            name="sex"
            render={({field}) => (
              <FormItem className="space-y-3">
                <FormLabel>Sex</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="M" />
                      </FormControl>
                      <FormLabel className="font-normal">Male</FormLabel>
                    </FormItem>

                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="F" />
                      </FormControl>
                      <FormLabel className="font-normal">Female</FormLabel>
                    </FormItem>

                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="OTHER" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Prefer not to say
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full">
          <FormField
            name="birth_date"
            control={form.control}
            render={({field}) => (
              <FormItem className="text-md flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl className="w-full">
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Your date of birth is used to calculate your age.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full">
          <FormField
            name="bio"
            control={form.control}
            render={({field}) => (
              <FormItem className="text-md">
                <FormLabel>Bio</FormLabel>
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
            name="about"
            control={form.control}
            render={({field}) => (
              <FormItem className="text-md">
                <FormLabel>About</FormLabel>
                <FormControl className="h-12">
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full">
          <Button
            className="h-12 w-full rounded-full"
            type="submit"
            isLoading={isLoading}
          >
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
};
