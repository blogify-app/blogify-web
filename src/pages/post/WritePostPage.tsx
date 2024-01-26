import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {uuid} from "@tinymce/tinymce-react/lib/es2015/main/ts/Utils";
import {WritePost} from "@/features/post";
import {Layout} from "@/layout";
import {Post, PostStatus} from "@/services/api/gen";
import {PostProvider} from "@/services/api";

export const WritePostPage = () => {
  const [post, setPost] = useState<Post | null>(null);

  const pid = useParams().pid!;

  useEffect(() => {
    const fetch = async () => {
      let post: Post;
      try {
        post = await PostProvider.getById(pid);
      } catch (e: any) {
        // TODO: assuming status is 404 here, handle 403, and other status code properly
        const id = uuid(pid /* prefix */);
        post = await PostProvider.crupdateById(id, {
          id,
          content: "",
          status: PostStatus.DRAFT,
          creation_datetime: new Date(),
          author_id: undefined /* TODO: current user */,
          categories: [],
        });
      }
      setPost(post);
    };

    if (pid) {
      void fetch();
    }
  }, [pid]);

  return (
    <Layout>
      {/* TODO: Add loader */}
      {post && <WritePost post={post} />}
    </Layout>
  );
};
