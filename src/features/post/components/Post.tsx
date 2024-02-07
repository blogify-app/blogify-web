import {FC, useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {Link} from "react-router-dom";
import {Icon} from "@iconify/react";
import {Badge} from "@/components/shadcn-ui/badge";
import {Layout} from "@/layout";
import {Reader} from "@/features/wisiwig";
import {calculateReadDuration} from "@/features/post/utils";
import {Comment} from "@/features/post";
import {Comment as CommentType, Post as PostType} from "@/services/api/gen";
import {CommentProvider} from "@/services/api";
import {useToast} from "@/hooks";
import blankUserProfile from "@/assets/noun-user-picture.svg";

export interface PostProps {
  post: PostType;
}

export const Post: FC<PostProps> = ({post}: PostProps) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const toast = useToast();

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

  // TODO: to restore
  useEffect(() => {
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
            <div data-testid="post-tags" className="mx-10 flex w-full py-10">
              <span className="mr-2">Tags : </span>
              <div className="flex justify-evenly">
                <Badge className="mx-1">Lorem</Badge>
                <Badge className="mx-1">Ipsum</Badge>
                <Badge className="mx-1">Hello</Badge>
              </div>
            </div>
            <div className="mx-10 h-[90vh] overflow-auto">
              <InfiniteScroll
                data-testid="comment-scroll"
                dataLength={comments.length}
                next={fetch}
                hasMore={false}
                loader={<p className="align-middle">Loading...</p>}
                endMessage={
                  <p className="text-center text-xs">
                    No more comment to load.
                  </p>
                }
              >
                {comments.map((comment, index) => (
                  <Comment key={index} comment={comment} />
                ))}
              </InfiniteScroll>
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
