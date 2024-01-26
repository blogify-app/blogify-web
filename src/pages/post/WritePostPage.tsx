import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Layout} from "@/layout";
import {WritePost} from "@/features/post";
import {Post} from "@/services/api/gen";
import {PostProvider} from "@/services/api";

export const WritePostPage = () => {
  // TODO: handle
  const pid = useParams().pid!;
  const [post, _setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const p = await PostProvider.getById(pid);
        // TODO
      } catch (e) {
        /* EMPTY */
      }
    };

    void fetch();
  }, [pid]);

  return (
    <Layout>
      {/* TODO: Add loader */}
      {post && <WritePost post={post} />}
    </Layout>
  );
};
