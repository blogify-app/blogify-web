import {FC, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Post} from "@/features/post";
import {PostProvider} from "@/services/api";
import {Post as PostType} from "@/services/api/gen";

export const PostPage: FC = () => {
  const [post, setPost] = useState<PostType>({});

  const params = useParams();
  const id = params?.id!;

  useEffect(() => {
    PostProvider.getById(id).then((post) => setPost(post));
  }, []);

  return <Post post={post} />;
};
