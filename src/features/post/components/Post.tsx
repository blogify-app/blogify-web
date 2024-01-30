import {FC, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Icon} from "@iconify/react";
import {Badge} from "@/components/shadcn-ui/badge";
import {Layout} from "@/layout";
import {Reader} from "@/features/wisiwig";
import {calculateReadDuration} from "@/features/post/utils";
import {Post as PostType, ReactionType, User} from "@/services/api/gen";
import {PostProvider, UserProvider} from "@/services/api";
import blankUserProfile from "@/assets/noun-user-picture.svg";

export interface PostProps {
  post: PostType;
}

const reactToPost = (pid: string, reactionType: ReactionType) => {
  PostProvider.reactToPostById(pid, reactionType);
};

export const Post: FC<PostProps> = ({post}: PostProps) => {
  const [postAuthor, setPostAuthor] = useState<User>({});

  useEffect(() => {
    if (post?.author_id) {
      UserProvider.getById(post.author_id!).then((author) =>
        setPostAuthor(author)
      );
    }
  }, [post, setPostAuthor]);

  return (
    <Layout>
      <div
        data-testid="post-title"
        className="mb-4 mt-40 flex w-full justify-center p-11 md:mt-20"
      >
        <p className="font-optical-sizing-auto normal font-title text-6xl font-bold">
          {post?.title}
        </p>
      </div>
      <div className="flex w-full justify-center">
        <div
          data-testid="post-details"
          className="grid w-[31.25rem] grid-cols-3"
        >
          <div className="flex items-center justify-center">
            <Icon icon="material-symbols-light:face-6" className="text-2xl" />
            <span className="mx-1">
              by <strong>{postAuthor?.first_name}</strong>
            </span>
          </div>
          <div className="flex items-center justify-center">
            <Icon
              icon="material-symbols-light:nest-clock-farsight-analog-outline"
              className="text-2xl"
            />
            {/* TODO: relative datetime (like: 1 week ago) for later */}
            <span className="mx-1">
              {calculateReadDuration(post?.content).minutes} min read
            </span>
          </div>
          <div className="flex items-center justify-center">
            <Icon
              icon="material-symbols-light:calendar-month-outline"
              className="text-2xl"
            />
            <span className="mx-1">
              {new Date(post?.creation_datetime!).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
      <div className="my-5 grid grid-cols-8">
        <div className="col-span-1 h-[18.75rem]"></div>
        <div className="col-span-6 grid grid-cols-8 gap-5">
          {post.thumbnail_url && (
            <div data-testid="post-banner" className="col-span-8 h-[35rem]">
              <img
                src={post.thumbnail_url}
                className="rounded-sd h-full w-full object-cover"
              />
            </div>
          )}
          <div data-testid="post-content" className="col-span-8 p-4">
            <div className="mx-10">
              <Reader>{post?.content!}</Reader>
            </div>
            <div className="flex items-stretch justify-self-center">
              <div
                className="mx-5 flex items-stretch justify-self-center"
                onClick={() =>
                  reactToPost(post.id as string, ReactionType.LIKE)
                }
              >
                <svg
                  className="h-6 w-6 hover:bg-gray-400 focus:bg-gray-400 focus:outline-none focus:ring active:bg-gray-400 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 14.3H5a2 2 0 0 1-1.6-.9 2 2 0 0 1-.3-1.8l2.4-7.2C5.8 3.5 6 3 7.4 3c2 0 4.2.7 6.1 1.3l1.4.4v9.8a32 32 0 0 0-4.2 5.5c-.1.4-.5.7-.9.9a1.7 1.7 0 0 1-2.1-.7c-.2-.4-.3-.8-.3-1.3L9 14.3Zm10.8-.3H17V6a2 2 0 1 1 4 0v6.8c0 .7-.5 1.2-1.2 1.2Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <label className="ml-2">{post.reactions?.likes}</label>
              </div>
              <div
                className="mx-5 flex items-stretch justify-self-center"
                onClick={() =>
                  reactToPost(post.id as string, ReactionType.DISLIKE)
                }
              >
                <svg
                  className="h-6 w-6 hover:bg-gray-400 focus:bg-gray-400 focus:outline-none focus:ring active:bg-gray-400 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M15 9.7h4a2 2 0 0 1 1.6.9 2 2 0 0 1 .3 1.8l-2.4 7.2c-.3.9-.5 1.4-1.9 1.4-2 0-4.2-.7-6.1-1.3L9 19.3V9.5A32 32 0 0 0 13.2 4c.1-.4.5-.7.9-.9h1.2c.4.1.7.4 1 .7l.2 1.3L15 9.7ZM4.2 10H7v8a2 2 0 1 1-4 0v-6.8c0-.7.5-1.2 1.2-1.2Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <label className="ml-2">{post.reactions?.dislikes}</label>
              </div>
            </div>
            <div data-testid="post-tags" className="mx-10 flex w-full py-10">
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
    </Layout>
  );
};
