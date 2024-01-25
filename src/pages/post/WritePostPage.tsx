import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Layout} from "@/layout";
import {WritePost} from "@/features/post";
import {Post} from "@/services/api/gen";

export const WritePostPage = () => {
  // TODO: handle
  const {pid} = useParams();
  const [post, _setPost] = useState<Post | null>(null);

  useEffect(() => {
    // TODO: fetch post
  }, [pid]);

  return (
    <Layout>
      {/* TODO: Add loader */}
      {post && <WritePost post={post} />}
    </Layout>
  );
};
