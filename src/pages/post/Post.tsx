import {Button} from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {Badge} from "@/components/ui/badge";
import {Link} from "react-router-dom";
import {Icon} from "@iconify/react";
import image from "../../assets/daisy_fields.jpg";
import blankUserProfile from "../../assets/noun-user-picture.svg";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {posts} from "./data/posts";
import {users} from "./data/user";
import {calculateReadTime} from "../../lib/get_reading_time";

const BADGES = ["lorem", "ipsum", "hello"];

const NavBar: React.FC = () => {
  return (
    <div
      id="blogify-menu"
      className="fixed grid w-screen grid-cols-10 gap-3 bg-white px-10 py-5 shadow-md shadow-slate-200"
    >
      <div className="logo w-30 h-15 col-span-1">
        <Link
          to="/"
          className="text-2xl"
          style={{fontFamily: "Lilita One, sans-serif", fontWeight: "bolder"}}
        >
          BLOGIFY
        </Link>
      </div>
      <div className="col-span-8 flex justify-center">
        <NavigationMenu>
          <NavigationMenuList className="flex flex-col flex-wrap md:flex-row">
            <NavigationMenuItem className="mx-4 w-40">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="mx-4 w-40">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                About
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="mx-4 w-40">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Profile
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="col-span-1 flex justify-evenly align-middle">
        <Link to="">
          <Avatar>
            <AvatarImage src="random_link" />
            <AvatarFallback>
              <Icon icon="material-symbols-light:face-6" className="text-2xl" />
            </AvatarFallback>
          </Avatar>
        </Link>
        <Button className="flex justify-evenly align-middle">
          <Icon icon="material-symbols-light:login" className="text-2xl" />
        </Button>
      </div>
    </div>
  );
};

export const Post: React.FC = () => {
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
        id="post-title"
        className="mb-4 mt-40 flex w-screen justify-center p-11 md:mt-20"
      >
        <p
          className="text-6xl"
          style={{
            fontFamily: "Oswald, sans-serif",
            fontOpticalSizing: "auto",
            fontWeight: 618,
            fontStyle: "normal",
          }}
        >
          {currentPost?.title}
        </p>
      </div>
      <div className="flex w-screen justify-center">
        <div id="blog-info" className="grid w-[500px] grid-cols-3">
          <div id="user-info" className="flex items-center justify-center">
            <Icon icon="material-symbols-light:face-6" className="text-2xl" />
            <span className="mx-1">
              by <strong>{postAuthor.first_name}</strong>
            </span>
          </div>
          <div
            id="read-duration-info"
            className="flex items-center justify-center"
          >
            <Icon
              icon="material-symbols-light:nest-clock-farsight-analog-outline"
              className="text-2xl"
            />
            <span className="mx-1">{`${calculateReadTime(currentPost?.content || "").minutes} min read`}</span>
          </div>
          <div
            id="creation-date-info"
            className="flex items-center justify-center"
          >
            <Icon
              icon="material-symbols-light:calendar-month-outline"
              className="text-2xl"
            />
            <span className="mx-1">
              {new Date(currentPost?.creation_datetime).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
      <div className="my-5 grid grid-cols-8">
        <div className="col-span-1 h-[300px]"></div>
        <div className="col-span-6 grid grid-cols-8 gap-5">
          <div className="col-span-8 h-[300px]">
            <img src={image} className="h-full w-full object-cover" />
          </div>
          <div className="col-span-2 p-4">
            <div className="mx-4 flex flex-col justify-center">
              <p
                className="mb-5 text-left text-2xl"
                style={{
                  fontFamily: "Oswald, sans-serif",
                }}
              >
                Menu
              </p>
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
          <div id="post-container" className="col-span-6 p-4">
            <div className="mx-10">{currentPost?.content}</div>
            <div id="tags-container" className="mx-10 flex w-full py-10">
              <span className="mr-2">Tags : </span>
              <div className="flex justify-evenly">
                {BADGES.map((badge) => (
                  <Badge className="mx-1">{badge}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 h-[300px]"></div>
      </div>
      <div id="about-author" className="grid grid-cols-8 bg-slate-50 ">
        <div className="col-span-1 h-[300px]"></div>
        <div className="col-span-6 grid h-[300px] grid-cols-8">
          <div id="author-picture" className=" col-span-2 flex justify-center">
            <img
              src={blankUserProfile}
              className="m-auto h-[200px] w-[200px] rounded-md bg-white object-cover"
            />
          </div>
          <div
            id="author-details"
            className="container col-span-6 flex flex-col justify-center"
          >
            <Link
              to=""
              id="author-name"
              className="mb-5 text-left text-2xl hover:text-slate-700 focus:text-slate-200 active:font-semibold"
              style={{
                fontFamily: "Oswald, sans-serif",
              }}
            >{`${postAuthor?.first_name} ${postAuthor?.last_name}`}</Link>
            <p className="overflow-hidden truncate">{postAuthor?.about}</p>
            <Link
              to=""
              className=" my-3 underline hover:text-slate-700 focus:text-slate-700 active:font-semibold"
            >
              See more about this author
            </Link>
          </div>
        </div>
        <div className="col-span-1 h-[300px]"></div>
      </div>
    </div>
  );
};
