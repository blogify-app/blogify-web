import {FC} from "react";
import {Link} from "react-router-dom";
import {Post} from "@/services/api/gen";
import {formatDate} from "@/common/utils";
import {Icons} from "@/components/common/icons";
import {ViewPost} from "@/features/post/analysis.tsx";

type UserPostCardProps = {
  isSelf: boolean;
  post: Post;
};

// TODO: ban from common and rename!!!
export const UserPostCard: FC<UserPostCardProps> = ({post, isSelf}) => {
  return (
    <div
      data-testid="custom-card"
      className="col-span-2 m-6 bg-white shadow dark:border-gray-700 dark:bg-gray-800"
    >
      <ViewPost pid={post.id!}>
        {post.thumbnail_url ? (
          <img
            className="h-44 w-full rounded-t-md"
            src={post?.thumbnail_url}
            alt="Content thumbails"
          />
        ) : (
          <div className="flex h-44 w-full items-end rounded-t-md bg-gray-400">
            <span className="font-logo text-9xl tracking-tight text-white">
              B
            </span>
          </div>
        )}
      </ViewPost>

      <div className="p-5">
        <p className="flex justify-between text-xs text-red-800">
          <div>
            <span>
              {post?.author?.first_name + " " + post?.author?.last_name}
            </span>
            {" - "}
            <span>
              {formatDate(post?.creation_datetime?.toString() as string)}
            </span>
          </div>
          {isSelf && (
            <div>
              <Link to={`/posts/write/${post?.id}`}>
                <Icons.editPost />
              </Link>
            </div>
          )}
        </p>
        <ViewPost pid={post.id!}>
          <h5
            data-testid="title"
            className="text-md mb-2 font-bold tracking-tight text-gray-900 dark:text-white"
          >
            {post?.title}
          </h5>
        </ViewPost>
        <p
          data-testid="description"
          className="mb-3 text-xs font-normal text-gray-700 dark:text-gray-400"
        >
          {post?.description}
        </p>
        <div className="flex justify-between text-xs font-light text-violet-800">
          {(post.categories || []).map((category) => (
            <div
              data-testid={"post-category-" + category.id}
              key={category.id}
              className="rounded-[8px] bg-purple-100 px-3 py-1"
            >
              {category.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
