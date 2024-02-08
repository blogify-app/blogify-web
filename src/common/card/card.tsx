import {FC} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Post} from "@/services/api/gen";

type UserActivity = {
  isSelf: boolean;
  post: Post;
};

// TODO: ban from common and rename!!!
export const CustomCard: FC<UserActivity> = ({post, isSelf}) => {
  const navigate = useNavigate();

  return (
    <div
      data-testid="custom-card"
      className="col-span-2 m-6 bg-white shadow dark:border-gray-700 dark:bg-gray-800"
      onClick={() => navigate(`/posts/${post.id}`)}
    >
      <Link to={`/posts/${post.id}`}>
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
      </Link>
      <div className="p-5">
        <p className="flex justify-between text-xs text-red-800">
          <div>
            <span>
              {post?.author?.first_name + " " + post?.author?.last_name}
            </span>
            {" - "}
            <span>{post?.creation_datetime?.toString().slice(0, 10)}</span>
          </div>
          {isSelf && (
            <div>
              <Link to={`/posts/write/${post?.id}`}>
                <svg
                  className="h-4 w-4 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m14.3 4.8 2.9 2.9M7 7H4a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h11c.6 0 1-.4 1-1v-4.5m2.4-10a2 2 0 0 1 0 3l-6.8 6.8L8 14l.7-3.6 6.9-6.8a2 2 0 0 1 2.8 0Z"
                  />
                </svg>
              </Link>
            </div>
          )}
        </p>
        <h5
          data-testid="title"
          className="text-md mb-2 font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {post?.title}
        </h5>
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
