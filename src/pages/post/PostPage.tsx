import {FC} from "react";
import {Post} from "@/features/post";
import {post} from "./data/posts";

export const PostPage: FC = () => {
  return <Post post={post} />;
};
