import {ChangeEvent, FC, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {format} from "date-fns";
import {CalendarIcon} from "lucide-react";
import {Avatar, AvatarImage} from "@/components/shadcn-ui/avatar";
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
import {cn} from "@/lib/utils.ts";
import placeholder from "@/assets/profil-pic-placeholder.png";
import {User} from "@/services/api/gen";
import {profileEditSchema} from "@/features/profile/schema";
import {Query, UserProvider} from "@/services/api";
import {UserPictureType} from "@/services/api/gen";

interface ProfileEditProps {
  user: User;
}

export const ProfileEdit: FC<ProfileEditProps> = ({user}: ProfileEditProps) => {
  const currentUser = user;
  const [imageSrc, setImageSrc] = useState<string | undefined>(placeholder);
  const birthDate = currentUser?.birth_date
    ? new Date(currentUser.birth_date)
    : new Date();
  const [currentBirthDate, setCurrentBirthDate] = useState(birthDate);

  const form = useForm<User>({
    resolver: zodResolver(profileEditSchema),
    defaultValues: {
      first_name: currentUser?.first_name,
      last_name: currentUser?.last_name,
      username: currentUser?.username,
      sex: currentUser?.sex,
      bio: currentUser?.bio,
      about: currentUser?.about,
      id: currentUser?.id,
    },
  });

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageSrc(imageUrl);
      const pictureQuery: Query<{type: UserPictureType}> = {
        page: 1,
        pageSize: 10,
        params: {
          type: "PROFILE",
        },
      };
      await UserProvider.putPicture(currentUser?.id ?? "", file, pictureQuery);
    }
  };

  const onCreate: SubmitHandler<User> = async (userInfos) => {
    const newUser: User = {
      id: userInfos?.id,
      last_name: userInfos?.last_name,
      first_name: userInfos?.first_name,
      birth_date: currentBirthDate.toISOString(),
      bio: userInfos?.bio,
      about: userInfos?.about,
      sex: userInfos?.sex,
    };
    try {
      await UserProvider.crupdateById(userInfos?.id ?? "", newUser);
    } catch (e) {
      // TODO: handle error
      console.error(e);
    }
  };

  return (
    <Form {...form}>
      <div className="flex h-full w-full flex-row">
        <div className="mb-6 flex w-1/2 w-[40rem] flex-col items-center space-y-6">
          <div className="w-4/5">
            <FormField
              name="first_name"
              control={form.control}
              render={({field}) => (
                <FormItem className="text-md" data-testid="first_name_input">
                  <FormLabel>First name</FormLabel>
                  <FormControl className="h-12">
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-4/5">
            <FormField
              name="last_name"
              control={form.control}
              render={({field}) => (
                <FormItem className="text-md" data-testid="last_name_input">
                  <FormLabel>Last name</FormLabel>
                  <FormControl className="h-12">
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-4/5">
            <FormField
              name="username"
              control={form.control}
              render={({field}) => (
                <FormItem className="text-md" data-testid="username_input">
                  <FormLabel>User name</FormLabel>
                  <FormControl className="h-12">
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-4/5">
            <FormField
              control={form.control}
              name="sex"
              render={({field}) => (
                <FormItem className="space-y-3" data-testid="sex_input">
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

          <div className="w-4/5">
            <FormField
              name="birth_date"
              control={form.control}
              render={({field}) => (
                <FormItem
                  className="text-md flex flex-col"
                  data-testid="birth_date_input"
                >
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl className="w-full">
                        <Button
                          variant={"outline"}
                          data-testid="date_button"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span data-testid="date_span_button">
                              Pick a date
                            </span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        data-testid="birth_calendar"
                        selected={currentBirthDate}
                        onSelect={(date) => date && setCurrentBirthDate(date)}
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

          <div className="w-4/5">
            <FormField
              name="bio"
              control={form.control}
              render={({field}) => (
                <FormItem className="text-md" data-testid="bio_input">
                  <FormLabel>Bio</FormLabel>
                  <FormControl className="h-12">
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="h-auto w-4/5">
            <FormField
              name="about"
              control={form.control}
              render={({field}) => (
                <FormItem className="text-md" data-testid="about_input">
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
              onClick={form.handleSubmit(onCreate)}
            >
              Continue
            </Button>
          </div>
        </div>
        <div className="mb-6 mt-6 flex h-full w-1/2 w-[40rem] flex-col items-center space-y-4">
          <div className="w-full max-w-sm items-center gap-1.5">
            <Avatar className={"h-500 w-500"}>
              <AvatarImage
                src={imageSrc}
                alt="@shadcn"
                data-testid="avatar_image"
              />
            </Avatar>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Input id="picture" type="file" onChange={handleFileChange} />
          </div>
        </div>
      </div>
    </Form>
  );
};
