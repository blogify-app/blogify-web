import {Status} from "./posts";

export enum Sex {
  M,
  F,
}

export interface User {
  last_name: string;
  first_name: string;
  birth_date: Date;
  email: string;
  id: string;
  photo_url: string;
  bio: string;
  profile_banner_url: string;
  username: string;
  about: string;
  status: Status;
  sex: Sex;
  entrance_datetime: string;
}

export const users: User[] = [
  {
    last_name: "Doe",
    first_name: "John",
    birth_date: new Date("2024-01-19"),
    email: "john@doe.com",
    id: "user_1",
    photo_url: "string",
    bio: "Lorem Bio",
    profile_banner_url: "string",
    username: "John Doe",
    about:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias totam recusandae a reiciendis quas ducimus at tempora neque quasi eveniet, magni deleniti sapiente voluptas tenetur labore ad quod vero dignissimos?",
    status: Status.ENABLED,
    sex: Sex.M,
    entrance_datetime: "2024-01-19T11:09:59.342Z",
  },
];
