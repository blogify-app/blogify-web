import {FC, useCallback, useEffect, useRef, useState} from "react";
import Select from "react-select";
import {Editor} from "tinymce";
import {nanoid} from "nanoid";
import {Button} from "@/components/common/button.tsx";
import {ImageUpload} from "@/components/common/image-upload.tsx";
import {DescriptionInput, TitleInput} from "@/features/post";
import {RichTextEditor} from "@/features/wisiwig";
import {Category, Post, PostPicture} from "@/services/api/gen";
import {DEFAULT_QUERY, PostProvider} from "@/services/api";
import {transformHtmlContent} from "@/features/post/lib";
import {useLoading, useToast} from "@/hooks";
import {CategoryProvider} from "@/services/api/provider/category_provider";
import {CategoryOption} from "@/features/post/types";

export interface WritePostProps {
  post: Post;
  isExistent?: boolean;
}

export const WritePost: FC<WritePostProps> = ({post, isExistent = false}) => {
  const {queue, isLoading} = useLoading("crupdate_post");
  const toast = useToast();

  const [editor, setEditor] = useState<Editor | null>(null);
  const [pictures, setPictures] = useState<PostPicture[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const thumbnailFileRef = useRef<File | null>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const selectedCategoriesRef = useRef<CategoryOption[]>([]);

  const shouldUpdateRemoteThumbnail = useRef(false);

  useEffect(() => {
    const fetchPictures = async () => {
      if (!isExistent) return null;
      try {
        const pictures = await PostProvider.getPictures(post.id!);
        setPictures(pictures);
      } catch (e) {
        console.error(e);
        toast({
          variant: "destructive",
          message: "unable to get post " + post.id + " pictures",
        });
      }
    };
    void fetchPictures();
  }, [isExistent, post]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await CategoryProvider.getMany();
        const options = categories.map((option) => ({
          value: option.id,
          label: option.label,
        }));
        setCategories(options);
      } catch (e) {
        console.error(e);
        toast({
          variant: "destructive",
          message: "unable to get post " + post.id + " pictures",
        });
      }
    };
    void fetchCategories();
  }, [post]);

  // bind title/content to the post object
  const syncPost = useCallback(() => {
    post.title = titleInputRef.current?.value || "";
    post.description = descriptionInputRef.current?.value || "";
    post.categories =
      selectedCategoriesRef.current.length > 0
        ? selectedCategoriesRef.current
        : post.categories;
    post.content = editor?.getContent() || "";
  }, [post, editor]);

  const createNewPost = async () => {
    try {
      syncPost();
      await queue(() => PostProvider.crupdateById(post.id!, post));
      window.location.replace(`/posts/write/${post.id}`);
    } catch (e) {
      // TODO: handle error
    }
  };

  const updateRemoteThumbnail = useCallback(async () => {
    // FIXME: rename to thumbnail_id instead
    post.thumbnail_url ||= nanoid();
    try {
      const picture = await PostProvider.putThumbnail(
        post.id!,
        thumbnailFileRef.current!
      );
      post.thumbnail_url = picture.url;
      shouldUpdateRemoteThumbnail.current = false;
    } catch (e) {
      toast({
        variant: "destructive",
        message: "Unable to upload post thumbnail",
      });
    }
  }, [post.thumbnail_url, post.id, toast]);

  /**
   * TODO: implement periodically caching to avoid loss
   */
  const save = useCallback(async () => {
    syncPost();
    post.updated_at = new Date();
    // shouldn't update post content itself
    const content = transformHtmlContent(post.content ?? "", pictures);
    try {
      await queue(async () => {
        if (shouldUpdateRemoteThumbnail.current) {
          await updateRemoteThumbnail();
        }
        await PostProvider.crupdateById(post.id!, {...post, content});
      });
    } catch (e) {
      // TODO: handle error
      toast({
        variant: "destructive",
        message: "Unable to save post state",
      });
    }
  }, [updateRemoteThumbnail, syncPost, post, toast]);

  // type any due to not iterable types of selectedOptions
  const handleChange = (selectedOptions: any) => {
    selectedCategoriesRef.current = selectedOptions.map(
      (category: CategoryOption) => ({
        id: category.value,
        label: category.label,
      })
    );
  };

  return (
    <div className="mx-auto my-0 flex h-full w-[75rem] justify-center">
      {/* paper */}
      <div className="h-full w-[50rem] space-y-2">
        <ImageUpload
          className="h-auto w-full cursor-pointer border-2 border-transparent bg-gray-300 text-xl font-bold text-gray-700 hover:border-gray-400"
          uploadText="Upload post thumbnail"
          defaultUri={post.thumbnail_url}
          onUpload={(image) => {
            // use ref cuz what we need is to bind the image with it then upload, ImageUpload already handles preview
            thumbnailFileRef.current = image;
            shouldUpdateRemoteThumbnail.current = true;
          }}
        />

        <div className="flex flex-col space-y-2">
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
            onImageUpload={async (blobInfo) => {
              const picId = nanoid();
              // we don't need lastModified and webkitRelativePath anyway
              const file = blobInfo.blob() as File;
              const uploaded = await PostProvider.uploadPicture(picId, file, {
                ...DEFAULT_QUERY,
                params: {
                  pid: post.id!,
                },
              });
              setPictures((pictures) => pictures.concat(uploaded));
              // uploaded.url
              return uploaded.url!;
            }}
            disabled={!editor}
            onInit={(_, e) => {
              setEditor(e);
            }}
          >
            {post.content ?? ""}
          </RichTextEditor>
          <div className="my-5">
            <label htmlFor="categories" className="pb-5">
              Categories:
            </label>
            <Select
              isMulti
              options={categories}
              onChange={handleChange}
              defaultValue={post?.categories}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
