import {FC, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Profile} from "@/features/profile";
import {DEFAULT_QUERY, PostProvider, UserProvider} from "@/services/api";
import {Post, User, UserPicture, UserPictureType} from "@/services/api/gen";
import {useToast} from "@/hooks";

export const ProfilePage: FC = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const {id} = useParams();

  const [user, setUser] = useState<User>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [picture, setPicture] = useState<UserPicture>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await UserProvider.getById(id);
        setUser(user);
      } catch (e) {
        // on 404 navigate back
        navigate("/");
      }
    };

    const fetchPost = async () => {
      try {
        const posts = await PostProvider.getPostsByUserId(id, {
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

    const fetchPic = async () => {
      try {
        const userPicture = await UserProvider.getPicture(id, {
          ...DEFAULT_QUERY,
          params: {
            type: UserPictureType.PROFILE,
          },
        });
        setPicture(userPicture);
      } catch (e) {
        toast({
          variant: "destructive",
          message: "Unable to fetch user posts",
        });
      }
    };

    void fetchUser();
    void fetchPost();
    void fetchPic();
  }, [id]);

  if (!user) return null;

  return <Profile pic={picture} user={user} posts={posts} />;
};
