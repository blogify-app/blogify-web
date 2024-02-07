import {FC, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Icon} from "@iconify/react";
import {Badge} from "@/components/shadcn-ui/badge";
import {Layout} from "@/layout";
import {Reader} from "@/features/wisiwig";
import {calculateReadDuration} from "@/features/post/utils";
import blankUserProfile from "@/assets/noun-user-picture.svg";
import {
  Comment as CommentType,
  Post as PostType,
  ReactionType,
} from "@/services/api/gen";
import {Comment} from "@/features/post";
import {CommentProvider, PostProvider} from "@/services/api";
import {useLoading, useToast} from "@/hooks";
import {Icons} from "@/components/common/icons";

export interface PostProps {
  post: PostType;
}

export const Post: FC<PostProps> = ({post}: PostProps) => {
  const {queue} = useLoading("reacting_post");
  const [comments, setComments] = useState<CommentType[]>([]);
  const toast = useToast();

  const reactToPost = async (pid: string, reactionType: ReactionType) => {
    try {
      await queue(() => PostProvider.reactToPostById(pid, reactionType));
      window.location.replace(`/posts/${post.id}`);
    } catch (e) {
      toast({
        message: "You should connect or have an account",
      });
    }
  };

  // TODO: to restore
  useEffect(() => {
    const fetch = async () => {
      if (!post) return;
      try {
        const comments = await CommentProvider.getMany({
          params: {pid: post.id!},
          page: 1,
          pageSize: 500,
        });

        setComments(comments);
      } catch (_e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        toast({
          message: "Could not get the post comment.",
        });
      }
    };
    void fetch();
  }, [post]);

  const {author} = post;

  return (
    <Layout>
      <div
        data-testid="post-title"
        className="mb-4 mt-40 flex w-full justify-center p-11 md:mt-20"
      >
        <p className="font-optical-sizing-auto normal font-title text-6xl font-bold">
          {post.title}
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
              by <strong>{author?.username}</strong>
            </span>
          </div>
          <div className="flex items-center justify-center">
            <Icon
              icon="material-symbols-light:nest-clock-farsight-analog-outline"
              className="text-2xl"
            />
            {/* TODO: relative datetime (like: 1 week ago) for later */}
            <span className="mx-1">
              {calculateReadDuration(post.content).minutes} min read
            </span>
          </div>
          <div className="flex items-center justify-center">
            <Icon
              icon="material-symbols-light:calendar-month-outline"
              className="text-2xl"
            />
            <span className="mx-1">
              {new Date(post.creation_datetime!).toLocaleDateString()}
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
              <Reader>{post.content!}</Reader>
            </div>
            <div className="flex items-stretch justify-self-center">
              <button
                data-testid="like"
                className="mx-5 flex items-stretch justify-self-center"
                onClick={() =>
                  reactToPost(post.id as string, ReactionType.LIKE)
                }
              >
                <Icons.like data-testid="like-svg" />
                <label data-testid="like-reaction" className="ml-2">
                  {post.reactions?.likes}
                </label>
              </button>
              <button
                data-testid="dislike"
                className="mx-5 flex items-stretch justify-self-center"
                onClick={() =>
                  reactToPost(post.id as string, ReactionType.DISLIKE)
                }
              >
                <Icons.dislike data-testid="dislike-svg" />
                <label data-testid="dislike-reaction" className="ml-2">
                  {post.reactions?.dislikes}
                </label>
              </button>
            </div>
            <div data-testid="post-tags" className="mx-10 flex w-full py-10">
              <span className="mr-2">Tags : </span>
              <div className="flex justify-evenly">
                <Badge className="mx-1">Lorem</Badge>
                <Badge className="mx-1">Ipsum</Badge>
                <Badge className="mx-1">Hello</Badge>
              </div>
            </div>
            <div className="mx-10">
              {comments.map((comment, index) => (
                <Comment key={index} comment={comment} />
              ))}
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
              to={`/users/${author?.id || ""}`}
              className="mb-5 text-left font-title text-2xl hover:text-slate-700 focus:text-slate-200 active:font-semibold"
            >
              {author?.first_name} {author?.last_name}
            </Link>
            <p className="overflow-hidden truncate">{author?.about}</p>
            <Link
              to={`/users/${author?.id || ""}`}
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
