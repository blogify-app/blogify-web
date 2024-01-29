import {Button} from "@/components/shadcn-ui/button";
import {Textarea} from "@/components/shadcn-ui/textarea";
import {useToggle} from "@/hooks/useToggle";
import {Icon} from "@iconify/react/dist/iconify.js";
import {Avatar, AvatarFallback, AvatarImage} from "@radix-ui/react-avatar";
import {FC} from "react";

export const Comment: FC = () => {
  const [isReplying, _setIsReplying, toggleIsReplying] = useToggle();

  return (
    <div id="comment-container" className="grid grid-cols-6  ">
      <div
        id="increase-decrease"
        className="col-span-1 flex flex-col items-end  "
      >
        <div className="m-4 flex w-12 flex-col items-center justify-between rounded-lg bg-slate-100 py-2">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full hover:bg-transparent"
          >
            <Icon icon="material-symbols-light:add" className="text-2xl" />
          </Button>
          <span className="text-xl font-semibold">12</span>
          <Button
            size="icon"
            className="rounded-full hover:bg-transparent"
            variant="ghost"
          >
            <Icon icon="material-symbols-light:remove" className="text-2xl" />
          </Button>
        </div>
      </div>
      <div id="comment-content" className="col-span-5 my-4">
        <div id="comment-header" className="grid grid-cols-5">
          <div className="col-span-2 flex items-center">
            <Avatar>
              <AvatarImage
                data-testid="avatar"
                className="h-10 w-10 rounded-full"
                src="https://github.com/shadcn.png"
              />
              <AvatarFallback data-testid="avatar">
                <Icon
                  icon="material-symbols-light:face-6"
                  className="text-2xl"
                />
              </AvatarFallback>
            </Avatar>
            <p className="mx-3 font-bold">John Doe</p>
            <p className="mx-4 text-slate-500">1 month ago</p>
          </div>
          <div className="col-span-2"></div>
          <div className="col-span-1 flex flex-col items-center">
            <Button
              variant="ghost"
              size="lg"
              className="space-x-4"
              onClick={toggleIsReplying}
            >
              <Icon icon="material-symbols-light:reply" className="text-xl" />
              <span>Reply</span>
            </Button>
          </div>
        </div>
        <div id="comment-content" className=" my-5 text-slate-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
          numquam eos iste tenetur minima aliquid facere maxime dolorem odio
          dolores, eveniet cumque in temporibus voluptas excepturi consequuntur
          cupiditate tempora illum. Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Dolorem voluptas aperiam praesentium exercitationem
          facere, earum odit repellendus adipisci aliquid, non pariatur incidunt
          magnam voluptates accusamus error ea magni temporibus voluptatibus.
        </div>
      </div>

      {isReplying && (
        <div className="col-span-6 grid grid-cols-6  ">
          <div className="col-span-1 flex flex-col items-end  ">
            <Avatar className=" mx-4 h-12 w-12">
              <AvatarImage
                data-testid="avatar"
                className="h-full w-full rounded-full"
                src="https://github.com/shadcn.png"
              />
              <AvatarFallback data-testid="avatar">
                <Icon
                  icon="material-symbols-light:face-6"
                  className="text-2xl"
                />
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="col-span-5 grid grid-cols-6 space-x-2  ">
            <Textarea
              className="col-span-5"
              placeholder="Write your comment here"
            />
            <div className="col-span-1 my-auto flex flex-col items-center">
              <Button type="submit" size="lg">
                Reply
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
