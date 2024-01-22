import {FC} from "react";
import {Link} from "react-router-dom";

import {Icon} from "@iconify/react";
import {Badge} from "@/components/shadcn-ui/badge";

import {NavBar} from "../../layout/NavBar";
import {calculateReadDuration} from "@/features/post/utils";
// TODO: replace static data with cypress tests
import {users} from "./data/user";
import {posts} from "./data/posts";

import bannerImage from "@/assets/daisy_fields.jpg";
import blankUserProfile from "@/assets/noun-user-picture.svg";

export const PostPage: FC = () => {
  // TODO: implement providers
  // TODO: implement error page if user or post is not found
  const currentPost = posts.filter((post) => post.id === "post_1")[0];

  const postAuthor = users.filter(
    (user) => user.id === currentPost?.user_id
  )[0];

  return (
    <div className=" overflow-hidden bg-white">
      <NavBar />
      <div
        data-testid="post-title"
        className="mb-4 mt-40 flex w-screen justify-center p-11 md:mt-20"
      >
        <p className="font-optical-sizing-auto normal font-title text-6xl font-bold">
          {currentPost?.title}
        </p>
      </div>
      <div className="flex w-screen justify-center">
        <div
          data-testid="post-details"
          className="grid w-[31.25rem] grid-cols-3"
        >
          <div className="flex items-center justify-center">
            <Icon icon="material-symbols-light:face-6" className="text-2xl" />
            <span className="mx-1">
              by <strong>{postAuthor?.first_name || "No user"}</strong>
            </span>
          </div>
          <div className="flex items-center justify-center">
            <Icon
              icon="material-symbols-light:nest-clock-farsight-analog-outline"
              className="text-2xl"
            />
            {/* TODO: relative datetime (like: 1 week ago) for later */}
            <span className="mx-1">
              {calculateReadDuration(currentPost?.content).minutes} min read
            </span>
          </div>
          <div className="flex items-center justify-center">
            <Icon
              icon="material-symbols-light:calendar-month-outline"
              className="text-2xl"
            />
            <span className="mx-1">
              {currentPost?.creation_datetime?.toLocaleDateString() ||
                "No date provided"}
            </span>
          </div>
        </div>
      </div>
      <div className="my-5 grid grid-cols-8">
        <div className="col-span-1 h-[18.75rem]"></div>
        <div className="col-span-6 grid grid-cols-8 gap-5">
          <div data-testid="post-banner" className="col-span-8 h-[35rem]">
            <img src={bannerImage} className="h-full w-full object-cover" />
          </div>
          <div className="col-span-2 border-r border-slate-200 p-4">
            <div
              data-testid="content-menu"
              className="mx-4 flex flex-col justify-center"
            >
              <p className="mb-5 text-left font-title text-2xl">Menu</p>
              <ul className="ml-1 text-left">
                <li>menu menu menu menu</li>
                <li>menu menu menu menu</li>
                <li>menu menu menu menu</li>
                <li>menu menu menu menu</li>
                <li>menu menu menu menu</li>
                <li>menu menu menu menu</li>
                <li>menu menu menu menu</li>
                <li>menu menu menu menu</li>
                <li>menu menu menu menu</li>
                <li>menu menu menu menu</li>
                <li>menu menu menu menu</li>
                <li>menu menu menu menu</li>
                <li>menu menu menu menu</li>
                <li>menu menu menu menu</li>
                <li>menu menu menu menu</li>
                <li>menu menu menu menu</li>
                <li>menu menu menu menu</li>
                <li>menu menu menu menu</li>
                <li>menu menu menu menu</li>
                <li>menu menu menu menu</li>
              </ul>
            </div>
          </div>
          <div data-testid="content" className="col-span-6 p-4">
            <div className="mx-10">{currentPost?.content}</div>
            <div data-testid="tags" className="mx-10 flex w-full py-10">
              <span className="mr-2">Tags : </span>
              <div className="flex justify-evenly">
                <Badge className="mx-1">Lorem</Badge>
                <Badge className="mx-1">Ipsum</Badge>
                <Badge className="mx-1">Hello</Badge>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 h-[18.75rem]"></div>
      </div>
      <div data-testid="user-details" className="grid grid-cols-8 bg-slate-50 ">
        <div className="col-span-1 h-[18.75rem]"></div>
        <div className="col-span-6 grid h-[18.75rem] grid-cols-8">
          <div
            data-testid="user-profile-picture"
            className=" col-span-2 flex justify-center"
          >
            <img
              src={blankUserProfile}
              className="m-auto h-[12.5rem] w-[12.5rem] rounded-md bg-white object-cover"
            />
          </div>
          <div className="container col-span-6 flex flex-col justify-center">
            <Link
              to=""
              className="mb-5 text-left font-title text-2xl hover:text-slate-700 focus:text-slate-200 active:font-semibold"
            >
              {postAuthor?.first_name} {postAuthor?.last_name}
            </Link>
            <p className="overflow-hidden truncate">{postAuthor?.about}</p>
            <Link
              to=""
              className=" my-3 underline hover:text-slate-700 focus:text-slate-700 active:font-semibold"
            >
              See more about this author
            </Link>
          </div>
        </div>
        <div className="col-span-1 h-[18.75rem]"></div>
      </div>
    </div>
  );
};
