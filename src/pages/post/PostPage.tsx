import {FC, useEffect, useState} from "react";
import {Post} from "@/features/post";
import {DEFAULT_QUERY, PostProvider} from "@/services/api";
import {Post as PostType} from "@/services/api/gen";
import {useParams} from "react-router-dom";

export const PostPage: FC = () => {
  const [post, setPost] = useState<PostType>({});

  const params = useParams();
  const id = params?.id!;

  useEffect(() => {
    PostProvider.getById(id).then((post) => setPost(post));
  }, []);

  return <Post post={post} />;
};
