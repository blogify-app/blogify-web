import {FC, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Editor} from "tinymce";
import {Button} from "@/components/shadcn-ui/button";
import {TitleInput} from "@/features/post";
import {RichTextEditor} from "@/features/wisiwig";
import {Post} from "@/services/api/gen";
import {PostProvider} from "@/services/api";

export interface WritePostProps {
  post: Post;
  isExistent?: boolean;
}

export const WritePost: FC<WritePostProps> = ({post, isExistent = false}) => {
  const navigate = useNavigate();

  const [editor, setEditor] = useState<Editor | null>(null);

  const titleInputRef = useRef<HTMLInputElement>(null);

  const createNewPost = async () => {
    try {
      post.title = "New post";
      await PostProvider.crupdateById(post.id!, post);
      navigate(`/posts/write/${post.id}`);
    } catch (e) {
      // TODO: handle error
    }
  };

  /**
   * TODO: Also handle periodical caching to avoid loss of edit
   */
  const save = async () => {
    // at this point, editor is not null
    post.content = editor!.getContent();
    // ref is bound
    post.title = titleInputRef.current!.title ?? "";
    post.updated_at = new Date();
    try {
      await PostProvider.crupdateById(post.id!, post);
    } catch (e) {
      // TODO: handle error
    }
  };

  const canEdit = editor != null && isExistent;

  return (
    <div className="mx-auto my-0 flex h-full w-[75rem] justify-center">
      {/* paper */}
      <div className="h-full w-[50rem] space-y-2">
        <div className="flex h-[3.75rem] items-center justify-between gap-3 font-medium">
          <span className="text-2xl">Write</span>
          <TitleInput
            data-testid="post-title"
            ref={titleInputRef}
            disabled={!canEdit}
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
              >
                create new
              </Button>
            </div>
          ) : (
            <Button data-testid="save-post" onClick={save}>
              Save
            </Button>
          )}
        </div>

        <div
          style={{height: "calc(100% - 3.75rem)" /* accounting title */}}
          className="rounded border border-gray-200 p-2"
        >
          <RichTextEditor
            disabled={!canEdit}
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
