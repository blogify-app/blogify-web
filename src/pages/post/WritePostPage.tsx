import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {nanoid} from "nanoid";
import {Layout} from "@/layout";
import {WritePost} from "@/features/post";
import {createDraftPost} from "@/features/post/lib";
import {useAuthStore} from "@/features/auth";
import {PostProvider} from "@/services/api";

export const WritePostPage = () => {
  const user = useAuthStore((auth) => auth.user!);

  const [post, setPost] = useState(createDraftPost(nanoid(), user.id!));
  const [isExistent, setIsExistent] = useState(true);

  const pid = useParams().pid!;

  useEffect(() => {
    const fetch = async () => {
      try {
        const post = await PostProvider.getById(pid);
        setPost(post);
      } catch (e: any) {
        // suggest creating new post if "pid" is 404 not found
        // TODO: handle error status_code
        setIsExistent(false);
      }
    };

    void fetch();
  }, [pid]);

  return (
    <Layout>
      {/* TODO: Add loader */}
      <WritePost post={post} isExistent={isExistent} key={post.id} />
    </Layout>
  );
};
