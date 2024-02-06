import {FC, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Profile} from "@/features/profile/components";
import {PostProvider, UserProvider} from "@/services/api";
import {Post} from "@/services/api/gen";

export const ProfilePage: FC = () => {
  const [user, setUser] = useState({});
  const post: any = [];
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;
      try {
        const user = await UserProvider.getById(id);
        
        setUser(user);
      } catch (_e) {}
    };

    const fetchPost = async () => {
      if (!id) return;
      try {
        const allPost = await PostProvider.getMany({
          page: 1,
          pageSize: 50,
          params: {},
        });
        const filteredPost: Post[] = allPost.filter(
          (post) => post.author_id === id
        );
        
        post.push(filteredPost);
      } catch (e) {
        console.log(e);
      }
    };

    void fetchUser();
    void fetchPost();
  }, [id]);

  if (!user) return null;

  return <Profile user={user} post={post} />;
};
