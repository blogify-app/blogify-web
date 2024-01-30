import {FC, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Post} from "@/features/post";
import {PostProvider} from "@/services/api";
import {Post as PostType} from "@/services/api/gen";
import {toast} from "sonner";

export const PostPage: FC = () => {
  const [post, setPost] = useState<PostType>({});

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const fetch = async () => {
      if (!id) return;
      try {
        const post = await PostProvider.getById(id);
        setPost(post);
      } catch (_e) {
        toast("Could not get the post content.");
      }
    };

    void fetch();
  }, [id]);

  // TODO: loading .. or redirect
  if (!post) return null;
  return <Post post={post} />;
};
