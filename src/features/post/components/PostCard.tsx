import {FC} from "react";
import {formatDate} from "@/common/utils";
import {ViewPost} from "@/features/post/analysis.tsx";
import {Post} from "@/services/api/gen";
import defaultThumbnail from "@/assets/images/default-thumbnail.jpg";

interface PostCardProps {
  post: Post;
  direction: string;
}

export const PostCard: FC<PostCardProps> = ({post, direction}) => {
  if (!post) return null;

  const {
    id = "",
    thumbnail_url = "",
    description = "",
    title = "",
    author = {},
    creation_datetime = "",
    categories = [],
  } = post || {};

  const {last_name, first_name} = author ?? {};

  return (
    <ViewPost
      className={`grid grid-${direction === "col" ? "" : "cols"}-2 gap-4`}
      pid={post.id!}
      data-testid={`${id}`}
    >
      <div className="max-h-56 cursor-pointer overflow-hidden">
        {thumbnail_url ? (
          <img
            src={thumbnail_url}
            alt="Content thumbails"
            className="w-full object-cover"
          />
        ) : (
          <img
            src={defaultThumbnail}
            alt="Default thumbails"
            className="w-full object-cover"
            data-testid="default-thumbnail"
          />
        )}
      </div>
      <div className="bg-white">
        <p className="text-xs/8 text-purple-700">
          {first_name ?? ""} {last_name ?? ""} •{" "}
          <span>{formatDate(creation_datetime as string)}</span>
        </p>
        <a href="#">
          <h5 className="mb-2 text-lg font-semibold">{title}</h5>
        </a>
        <p className="mb-3 text-xs text-gray-400">{description}</p>
        <div className="flex space-x-2 pb-5 pt-2 text-xs font-normal">
          {categories.map((categorie) => {
            return (
              <div className="rounded-[8px] bg-green-100 px-3 py-1 text-green-800">
                {categorie.label}
              </div>
            );
          })}
        </div>
      </div>
    </ViewPost>
  );
};
