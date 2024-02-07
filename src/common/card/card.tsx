import {FC} from "react";
import {Post, User} from "@/services/api/gen";
import {useNavigate} from "react-router-dom";

type UserActivity = {
  user: User | undefined;
  post: Post;
};

export const CustomCard: FC<UserActivity> = ({post}) => {
  const navigate = useNavigate();

  return (
    <div
      className="col-span-2 m-6 bg-white shadow dark:border-gray-700 dark:bg-gray-800"
      onClick={() => navigate(`/post/${post?.id}`)}
    >
      <a href="#">
        <img
          className="h-40"
          src={post?.thumbnail_url}
          alt="Content thumbails"
        />
      </a>
      <div className="p-5">
        <p data-testid="author-info" className="text-xs text-red-800">
          {post?.author?.first_name + " " + post?.author?.last_name} -{" "}
          <span>{post?.creation_datetime?.toString().slice(0, 10)}</span>
        </p>
        <a href="#">
          <h5
            data-testid="post-title"
            className="text-md mb-2 font-bold tracking-tight text-gray-900 dark:text-white"
          >
            {post?.title}
          </h5>
        </a>
        <p
          data-testid="post-description"
          className="mb-3 text-xs font-normal text-gray-700 dark:text-gray-400"
        >
          {post?.description}
        </p>
        <div className="flex justify-between text-xs font-light text-violet-800">
          {post.categories?.map((cat, k) => (
            <div
              data-testid={"post-category-" + k}
              key={k}
              className="rounded-[8px] bg-purple-100 px-3 py-1"
            >
              {cat?.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
