import {FC} from "react";
import {Post} from "./Post";
import {posts} from "./data/posts";
import {useParams} from "react-router-dom";

export const PostPage: FC = () => {
  const {id} = useParams();
  const currentPost = posts[0];

  return <Post post={currentPost} />;
};
