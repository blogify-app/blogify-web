import {FC} from "react";
import {Post} from "./Post";
import {post} from "./data/posts";
import {useParams} from "react-router-dom";

export const PostPage: FC = () => {
  const {id} = useParams();
  const currentPost = post;

  return <Post post={currentPost} />;
};
