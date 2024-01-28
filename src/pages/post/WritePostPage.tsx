import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {nanoid} from "nanoid";
import {Layout} from "@/layout";
import {Button} from "@/components/shadcn-ui/button";
import {WritePost} from "@/features/post";
import {createDraftPost} from "@/features/post/lib";
import {useAuthStore} from "@/features/auth";
import {PostProvider} from "@/services/api";

export const WritePostPage = () => {
  const user = useAuthStore((auth) => auth.user!);
  const navigate = useNavigate();

  const [post, setPost] = useState(createDraftPost(nanoid(), user));
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

  const createNewPost = async () => {
    try {
      post.title = "New post";
      await PostProvider.crupdate(post);
      navigate(`/posts/write/${post.id}`);
    } catch (e) {
      // TODO: handle error
    }
  };

  return (
    <Layout>
      {/* TODO: Add loader */}
      <WritePost post={post} created={isExistent} key={post.id} />
      <div className="mx-auto my-0 mt-2 flex w-[75rem] justify-center">
        {!isExistent && (
          <div className="flex w-[50rem] items-center gap-2">
            <span className="text-muted-foreground">
              This post does not exist
            </span>
            <Button data-testid="create-new-post" onClick={createNewPost}>
              create new
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};
