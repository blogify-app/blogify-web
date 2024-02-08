import {FC} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Post, User} from "@/services/api/gen";

type UserActivity = {
  user: User | undefined;
  post: Post;
};

// TODO: ban from common and rename!!!
export const CustomCard: FC<UserActivity> = ({post}) => {
  const navigate = useNavigate();

  return (
    <div
      data-testid="custom-card"
      className="col-span-2 m-6 bg-white shadow dark:border-gray-700 dark:bg-gray-800"
      onClick={() => navigate(`/posts/${post.id}`)}
    >
      <Link to={`/posts/${post.id}`}>
        <img
          className="h-40"
          src={post?.thumbnail_url}
          alt="Content thumbails"
        />
      </Link>
      <div className="p-5">
        <p className="text-xs text-red-800">
          <span>
            {post?.author?.first_name + " " + post?.author?.last_name}
          </span>
          {" - "}
          <span>{post?.creation_datetime?.toString().slice(0, 10)}</span>
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
