import {FC} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {format} from "date-fns";
import {CalendarIcon} from "lucide-react";
import {Button} from "@/components/shadcn-ui/button.tsx";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn-ui/popover.tsx";
import {Input} from "@/components/shadcn-ui/input.tsx";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/shadcn-ui/radio-group.tsx";
import {type Signup as User, signupSchema} from "@/features/auth/schema.ts";
import {cn} from "@/lib/utils.ts";

interface ProfileEditionProps {
  // onCreate(user: User): void;
}

export const ProfileEdition: FC<ProfileEditionProps> = () => {
  const form = useForm<User>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      categories: [],
    },
  });

  return (
    <Form {...form}>
      <div className="mb-6 flex w-[40rem] flex-col items-center justify-center space-y-6">
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
            // onClick={form.handleSubmit(onCreate)}
          >
            Continue
          </Button>
        </div>
      </div>
    </Form>
  );
};
