import {FC, useEffect, useState} from "react";
import {Profile} from "@/features/profile/components";
import {PostProvider} from "@/services/api";
import { useAuthStore } from "@/features/auth";
import { useParams } from "react-router-dom";
import { Post } from "@/services/api/gen";

export const ProfilePage: FC = () => {
  const user = useAuthStore((auth) => auth.user!);
  const [post, setPosts] = useState<Post[]>()
  const { id } = useParams()

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const posts = await PostProvider.getPostsByUserId(user?.id, {
          page: 1,
          pageSize: 50,
          params: {},
        });
        
        setPosts(posts)
      } catch (e) {
        console.log(e);
      }
    };
    
    if (user?.id == id) {
      void fetchPost();
    }

  }, [id]);

  return <Profile user={user} post={post} />;
};
