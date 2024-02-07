import {FC} from "react";
import {Post, User} from "@/services/api/gen";

type UserActivity = {
  user: User | undefined;
  post: Post;
};

export const CustomCard: FC<UserActivity> = ({post}) => {
  return (
    <div className="col-span-2 m-6 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
      <a href="#">
        <img className="h-40" src={post?.thumbnail_url} alt="Content thumbails" />
      </a>
      <div className="p-5">
        <p className="text-xs text-red-800">
          {post?.author?.first_name + " " + post?.author?.last_name} -{" "}
          <span>{post?.creation_datetime?.toString()}</span>
        </p>
        <a href="#">
          <h5 className="text-md mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
            {post?.title}
          </h5>
        </a>
        <p className="mb-3 text-xs font-normal text-gray-700 dark:text-gray-400">
          {post?.description}
        </p>
        <div className="flex justify-between text-xs font-light text-violet-800">
          {post.categories?.map((cat, k) => (
            <div key={k} className="rounded-[8px] bg-purple-100 px-3 py-1">
              {cat?.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
