import {FC, Dispatch, SetStateAction, useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {uuidv4} from "@firebase/util";
import {Avatar, AvatarFallback, AvatarImage} from "@radix-ui/react-avatar";
import {Icon} from "@iconify/react/dist/iconify.js";
import {useAuthStore} from "@/features/auth";
import {Button} from "@/components/common/button";
import {Textarea} from "@/components/shadcn-ui/textarea";
import {CommentProvider, UserProvider} from "@/services/api";
import {CommentStatus, Comment as CommentType} from "@/services/api/gen";

export interface CommentProps {
  comment: CommentType;
}

export interface AddCommentProps {
  postId: string;
  isRefresh: boolean;
  setIsRefresh: Dispatch<SetStateAction<boolean>>;
}

export const Comment: FC<CommentProps> = ({comment}: CommentProps) => {
  const {user, content, creation_datetime} = comment;

  if (!user) return null;

  return (
    <div id="comment-container" className="grid grid-cols-6 ">
      <div id="comment-content" className="col-span-5 my-4">
        <div id="comment-header" className="grid grid-cols-5">
          <div className="col-span-3 flex items-center">
            <Avatar>
              <AvatarImage
                data-testid="avatar"
                className="h-10 w-10 rounded-full"
                src={user.photo_url}
              />
              <AvatarFallback data-testid="avatar">
                <Icon
                  icon="material-symbols-light:face-6"
                  className="text-2xl"
                />
              </AvatarFallback>
            </Avatar>
            <p className="mx-3 font-bold" data-testid="comment-author-username">
              {user.username || `${user.first_name} ${user.last_name}`}
            </p>
            {creation_datetime && (
              <p
                className="mx-4 text-slate-500"
                data-testid="comment-creation-date"
              >
                {new Date(creation_datetime).toLocaleDateString()}
              </p>
            )}
          </div>
          <div className="col-span-1"></div>
          <div className="col-span-1 flex flex-col items-center"></div>
        </div>
        {content && (
          <div data-testid="comment-content" className=" my-5 text-slate-500">
            {content}
          </div>
        )}
      </div>
    </div>
  );
};

export const AddComment: FC<AddCommentProps> = ({
  postId: post_id,
  setIsRefresh,
  isRefresh,
}: AddCommentProps) => {
  const store = useAuthStore();
  const {user: whoami} = store;
  const commentId = uuidv4();
  const [user, setUser] = useState({});

  const getUser = () => {
    UserProvider.getById(whoami?.id!)
      .then((result) => setUser(result))
      .catch(() => {});
  };

  useEffect(() => {
    void getUser();
  }, []);

  const {control, handleSubmit, reset} = useForm();

  const addComment = async (data: any) => {
    reset();
    await CommentProvider.crupdateById(commentId, {
      id: commentId,
      user,
      post_id,
      content: data.comment,
      creation_datetime: new Date(),
      status: CommentStatus.ENABLED,
    }).then(() => {
      setIsRefresh(!isRefresh);
    });
  };

  return (
    <form onSubmit={handleSubmit(addComment)}>
      <div className="grid grid-cols-10 space-x-6">
        <Controller
          name="comment"
          control={control}
          defaultValue=""
          render={({field}) => (
            <Textarea
              {...field}
              className="col-span-7"
              placeholder="Type your comment here."
              data-testid="comment-input"
            />
          )}
        />
        <div className="col-span-2 flex items-center">
          <Button type="submit" data-testid="add-comment-button">
            <Icon icon="material-symbols-light:add" className="mr-2 text-2xl" />
            Add
          </Button>
        </div>
      </div>
    </form>
  );
};
