import {FC} from "react";
import {Icon} from "@iconify/react/dist/iconify.js";
import {Avatar, AvatarFallback, AvatarImage} from "@radix-ui/react-avatar";
import {Comment as CommentType} from "@/services/api/gen";

export interface CommentProps {
  comment: CommentType;
}

export const Comment: FC<CommentProps> = ({comment}: CommentProps) => {
  const {user, ...commentDetails} = comment;

  return (
    <div id="comment-container" className="grid grid-cols-6  ">
      <div id="comment-content" className="col-span-5 my-4">
        <div id="comment-header" className="grid grid-cols-5">
          <div className="col-span-3 flex items-center">
            <Avatar>
              <AvatarImage
                data-testid="avatar"
                className="h-10 w-10 rounded-full"
                src={user?.photo_url}
              />
              <AvatarFallback data-testid="avatar">
                <Icon
                  icon="material-symbols-light:face-6"
                  className="text-2xl"
                />
              </AvatarFallback>
            </Avatar>
            <p className="mx-3 font-bold" data-testid="comment-author-username">
              {user?.username}
            </p>
            <p
              className="mx-4 text-slate-500"
              data-testid="comment-creation-date"
            >
              {
                new Date(
                  commentDetails?.creation_datetime!
                ).toLocaleDateString()!
              }
            </p>
          </div>
          <div className="col-span-1"></div>
          <div className="col-span-1 flex flex-col items-center"></div>
        </div>
        <div data-testid="comment-content" className=" my-5 text-slate-500">
          {commentDetails?.content}
        </div>
      </div>
    </div>
  );
};
