import {FC, useRef, useState} from "react";
import {Editor} from "tinymce";
import {Button} from "@/components/common/button.tsx";
import {DescriptionInput, TitleInput} from "@/features/post";
import {RichTextEditor} from "@/features/wisiwig";
import {Post} from "@/services/api/gen";
import {PostProvider} from "@/services/api";
import {useLoading} from "@/hooks";

export interface WritePostProps {
  post: Post;
  isExistent?: boolean;
}

export const WritePost: FC<WritePostProps> = ({post, isExistent = false}) => {
  const {queue, isLoading} = useLoading("crupdate_post");

  const [editor, setEditor] = useState<Editor | null>(null);

  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

  // bind title/content to the post object
  const syncPost = () => {
    post.title = titleInputRef.current?.value || "";
    post.description = descriptionInputRef.current?.value || "";
    post.content = editor?.getContent() || "";
  };

  const createNewPost = async () => {
    try {
      syncPost();
      await queue(() => PostProvider.crupdateById(post.id!, post));
      window.location.replace(`/posts/write/${post.id}`);
    } catch (e) {
      // TODO: handle error
    }
  };

  /**
   * TODO: implement periodically caching to avoid loss
   */
  const save = async () => {
    syncPost();
    post.updated_at = new Date();
    try {
      await queue(() => PostProvider.crupdateById(post.id!, post));
    } catch (e) {
      // TODO: handle error
    }
  };

  return (
    <div className="mx-auto my-0 flex h-full w-[75rem] justify-center">
      {/* paper */}
      <div className="h-full w-[50rem] space-y-2">
        <div className="flex h-[3.75rem] items-center justify-between gap-3 font-medium">
          <span className="text-2xl">Write</span>
          <TitleInput
            data-testid="post-title"
            ref={titleInputRef}
            defaultValue={post.title}
          />
          {!isExistent ? (
            <div className="flex">
              <span className="text-muted-foreground">
                The post you're trying to edit does not exist
              </span>
              <Button
                data-testid="create-new-post"
                className="inline-block"
                onClick={createNewPost}
                isLoading={isLoading}
              >
                create new
              </Button>
            </div>
          ) : (
            <Button
              data-testid="save-post"
              disabled={!editor || isLoading}
              onClick={save}
              isLoading={isLoading}
            >
              Save
            </Button>
          )}
        </div>

        <div>
          <DescriptionInput
            data-testid="post-description"
            name="description"
            ref={descriptionInputRef}
            defaultValue={post.description}
          />
        </div>

        <div
          style={{height: "calc(100% - 3.75rem)" /* accounting title */}}
          className="rounded border border-gray-200 p-2"
        >
          <RichTextEditor
            disabled={!editor}
            onInit={(_, e) => {
              setEditor(e);
            }}
          >
            {post.content ?? ""}
          </RichTextEditor>
        </div>
      </div>
    </div>
  );
};
