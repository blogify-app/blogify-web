import {FC} from "react";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/shadcn-ui/button.tsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn-ui/form.tsx";
import {Input} from "@/components/shadcn-ui/input.tsx";
import {Icons} from "@/components/common/icons.tsx";
import {type Signup as User, signupSchema} from "@/features/auth/schema.ts";

export const Signup: FC = () => {
  const form = useForm<User>({
    resolver: zodResolver(signupSchema),
  });

  return (
    <Form {...form}>
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

        <div className="flex w-[35rem] flex-col items-center justify-center gap-8 space-y-6">
          <div className="w-full">
            <FormField
              name="email"
              control={form.control}
              render={({field}) => (
                <FormItem className="text-md h-12">
                  <FormLabel>Email</FormLabel>
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
              name="password"
              control={form.control}
              render={({field}) => (
                <FormItem className="text-md h-12">
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
            <Button className="h-12 w-full rounded-full">Continue</Button>
          </div>
        </div>

        <div className="flex w-[30rem] flex-col justify-center space-y-[1.5rem]">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                OR
              </span>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <Button size="lg" variant="outline">
              <Icons.google className="mr-2 h-4 w-4" /> Signup with Google
            </Button>

            <Button size="lg" variant="outline">
              <Icons.gitHub className="mr-2 h-4 w-4" /> Signup with github
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};
