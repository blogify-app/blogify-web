import {FC, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {nanoid} from "nanoid";
import {Icons} from "@/components/common/icons";
import {Button} from "@/components/shadcn-ui/button";
import {InlineMenu} from "@/common/inline-menu";
import {UserPostCard} from "@/features/post/components/";
import {useAuthStore} from "@/features/auth";
import {Post, User, UserPicture, UserPictureType} from "@/services/api/gen";
import {DEFAULT_QUERY, PostProvider, UserProvider} from "@/services/api";
import {useToast} from "@/hooks";
import defaultPic from "@/assets/noun-user-picture.svg";

export interface ProfileProps {
  user: User;
}

export const Profile: FC<ProfileProps> = ({user}) => {
  const authStore = useAuthStore();
  const toast = useToast();
  const navigate = useNavigate();

  const [posts, setPosts] = useState<Post[]>([]);
  const [picture, setPicture] = useState<UserPicture>();

  const isSelf = user.id === authStore.user?.id;

  const uid = user.id;
  useEffect(() => {
    const getUserPosts = async () => {
      try {
        const posts = await PostProvider.getPostsByUserId(uid, {
          page: 1,
          pageSize: 50,
          params: {},
        });
        setPosts(posts);
      } catch (e) {
        toast({
          variant: "destructive",
          message: "Unable to fetch user posts",
        });
      }
    };

    const getUserPic = async () => {
      try {
        const userPicture = await UserProvider.getPicture(uid, {
          ...DEFAULT_QUERY,
          params: {
            type: UserPictureType.PROFILE,
          },
        });
        setPicture(userPicture);
      } catch (e) {
        toast({
          variant: "destructive",
          message: "Unable to fetch user profile picture",
        });
      }
    };
    void getUserPic();
    void getUserPosts();
  }, [uid]);

  const notImplemented = () => {
    toast({
      variant: "default",
      message: "Cheers to the features waiting to be unlocked! 🚀 #ComingSoon",
    });
  };

  return (
    <div>
      <div className="flex items-center p-12">
        <div className="px-12">
          <img
            className="h-40 w-40 rounded-[100%]"
            src={picture?.url || defaultPic}
            alt="user profile"
          />
        </div>
        <div>
          <div className="flex flex-row items-center ">
            <div className="mr-4 h-full text-3xl font-bold">
              {user.first_name} {user.last_name}
            </div>
            {isSelf && (
              <Link
                to={`/users/edit/${user?.id}`}
                data-testid="customize-channel"
                className="my-1 mr-2 rounded-[15px] hover:text-gray-600"
              >
                <Icons.edit />
              </Link>
            )}
            <Link
              to={`/posts`}
              data-testid="customize-channel"
              className="my-1 rounded-[15px] hover:text-gray-600"
            >
              <Icons.back />
            </Link>
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
                  New Post
                </Button>
              </>
            )}

            {!isSelf && (
              <Button className="my-2 rounded-[25px] hover:bg-gray-600">
                <Icons.bell />
                Follow
              </Button>
            )}
          </div>
        </div>
      </div>

      <InlineMenu action={notImplemented} />

      <hr className="mx-6" />

      <div className="grid h-auto grid-cols-8 gap-4 p-10">
        {posts.map((post) => (
          <UserPostCard key={post.id} post={post} isSelf={isSelf} />
        ))}
      </div>
    </div>
  );
};
