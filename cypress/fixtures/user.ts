import {
  Sex,
  User,
  UserPicture,
  UserPictureType,
  UserStatus,
  Whoami,
} from "../../src/services/api/gen";

export const user1 = (): User => ({
  last_name: "worker",
  first_name: "Blogify",
  birth_date: "2024-01-19",
  email: "john@doe.com",
  id: "user_1",
  photo_url: "string",
  bio: "Lorem Bio",
  profile_banner_url: "string",
  username: "John Doe",
  about:
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias totam recusandae a reiciendis quas ducimus at tempora neque quasi eveniet, magni deleniti sapiente voluptas tenetur labore ad quod vero dignissimos?",
  status: UserStatus.ENABLED,
  sex: Sex.M,
  categories: [
    {
      id: "string",
      label: "string",
    },
  ],
  is_followed: true,
  entrance_datetime: new Date("2024-01-19"),
});

export const user1_modified = (): User => ({
  last_name: "worker",
  first_name: "Blogify modified",
  birth_date: "2024-01-19",
  email: "john@doe.com",
  id: "user_1",
  photo_url: "string",
  bio: "Lorem Bio",
  profile_banner_url: "string",
  username: "John Doe",
  about:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias totam recusandae a reiciendis quas ducimus at tempora neque quasi eveniet, magni deleniti sapiente voluptas tenetur labore ad quod vero dignissimos?",
  status: UserStatus.ENABLED,
  sex: Sex.M,
  categories: [
    {
      id: "string",
      label: "string",
    },
  ],
  is_followed: true,
  entrance_datetime: new Date("2024-01-19"),
});

export const whoami1 = (): Whoami => ({
  ...user1(),
  bearer: "bearer",
});

export const userPicture = (): UserPicture => ({
  user_id: user1()?.id,
  type: UserPictureType.PROFILE,
  url: "image_url",
});
