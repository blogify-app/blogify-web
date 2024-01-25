import {FC, useRef} from "react";
import {Editor} from "tinymce";
import {RichTextEditor} from "@/features/wisiwig";
import {Post} from "@/services/api/gen";

export interface WritePostProps {
  post: Post;
}

export const WritePost: FC<WritePostProps> = ({post}) => {
  const editorRef = useRef<Editor | null>(null);

  // TODO: responsive
  return (
    <div className="mx-auto my-0 flex h-full w-[75rem] justify-center">
      {/* paper */}
      <div className="h-full w-[50rem]">
        <div className="flex h-[3.75rem] items-center text-2xl font-medium">
          Writing: {post.id}
        </div>

        <div
          style={{height: "calc(100% - 3.75rem)" /* accounting title */}}
          className="rounded border border-gray-200 p-2"
        >
          <RichTextEditor
            onInit={(_, editor) => {
              editorRef.current = editor;
            }}
          >
            {post.content ?? ""}
          </RichTextEditor>
        </div>
      </div>
    </div>
  );
};
