import {FC} from "react";
import {useNavigate} from "react-router-dom";
import {nanoid} from "nanoid";
import {Button} from "@/components/shadcn-ui/button";
import {InlineMenu} from "@/common/inline-menu";
import {CustomCard} from "@/common/card";
import {useAuthStore} from "@/features/auth";
import {Post, User, UserPicture} from "@/services/api/gen";
import defaultPic from "@/assets/noun-user-picture.svg";

export interface ProfileProps {
  pic: UserPicture | undefined;
  user: User;
  posts: Post[];
}

export const Profile: FC<ProfileProps> = ({pic, user, posts}) => {
  const authStore = useAuthStore();
  const navigate = useNavigate();

  const isSelf = user.id === authStore.user?.id;

  return (
    <div>
      <div className="flex items-center p-12">
        <div className="px-12">
          <img
            className="h-40 w-40 rounded-[100%]"
            src={pic?.url || defaultPic}
            alt="user profile"
          />
        </div>
        <div>
          <div className="text-3xl font-bold">
            {user.first_name} {user.last_name}
          </div>

          <p className="text-light text-sm">{"@" + user?.username}</p>

          <p className="text-light text-xs text-gray-500">{user?.bio}</p>

          <p className="text-light text-xs text-gray-500">{user?.about}</p>
          <p className="text-light text-sm">Find out more about this channel</p>

          <div className="flex justify-between">
            {isSelf && (
              <>
                <Button
                  data-testid="customize-channel"
                  className="my-2 rounded-[25px] hover:bg-gray-600"
                >
                  <svg
                    className="h-6 w-6 text-white dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.1 12.6v-1.8A5.4 5.4 0 0 0 13 5.6V3a1 1 0 0 0-2 0v2.4a5.4 5.4 0 0 0-4 5.5v1.8c0 2.4-1.9 3-1.9 4.2 0 .6 0 1.2.5 1.2h13c.5 0 .5-.6.5-1.2 0-1.2-1.9-1.8-1.9-4.2ZM8.8 19a3.5 3.5 0 0 0 6.4 0H8.8Z" />
                  </svg>
                  Customize channel
                </Button>
                <Button
                  data-testid="create-post"
                  className="m-2 rounded-[25px] hover:bg-gray-600"
                  onClick={() => navigate(`/posts/write/${nanoid()}`)}
                >
                  Manage contents
                </Button>
              </>
            )}

            {!isSelf && (
              <Button className="my-2 rounded-[25px] hover:bg-gray-600">
                <svg
                  className="h-6 w-6 text-white dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.1 12.6v-1.8A5.4 5.4 0 0 0 13 5.6V3a1 1 0 0 0-2 0v2.4a5.4 5.4 0 0 0-4 5.5v1.8c0 2.4-1.9 3-1.9 4.2 0 .6 0 1.2.5 1.2h13c.5 0 .5-.6.5-1.2 0-1.2-1.9-1.8-1.9-4.2ZM8.8 19a3.5 3.5 0 0 0 6.4 0H8.8Z" />
                </svg>
                Follow
              </Button>
            )}
          </div>
        </div>
      </div>

      <InlineMenu />

      <hr className="mx-6" />

      <div className="grid h-auto grid-cols-8 gap-4 p-10">
        {posts.map((post) => (
          <CustomCard key={post.id} user={user} post={post} />
        ))}
      </div>
    </div>
  );
};
