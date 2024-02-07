import {FC, useEffect, useState} from "react";
import {Profile} from "@/features/profile/components";
import {PostProvider, Query, UserProvider} from "@/services/api";
import { useParams } from "react-router-dom";
import { Post, User, UserPicture, UserPictureType, } from "@/services/api/gen";

export const ProfilePage: FC = () => {
  const [user, setUser] = useState<User>();
  const [post, setPosts] = useState<Post[]>()
  const { id } = useParams()
  const [picture, setPicture] = useState<UserPicture>()

  useEffect(() => {
    const fetchUser = async () =>{
      const userData = await UserProvider.getById(id);
      setUser(userData)
    }

    const fetchPost = async () => {
      try {
        const posts = await PostProvider.getPostsByUserId(id, {
          page: 1,
          pageSize: 50,
          params: {},
        });
        
        setPosts(posts)
      } catch (e) {
        console.log(e);
      }
    };

    const fetchPic = async () => {
      const payload: Query<any> = {
        page: 0,
        pageSize: 500,
        params: { type: UserPictureType.PROFILE },
      };

      try {
        const picData = await UserProvider.getPicture(id, payload)
        setPicture(picData)
      } catch (_error) {
        
      }
    }
    
    
    if (id) {
      void fetchUser()
      void fetchPost();
      void fetchPic()
    }

  }, [id]);

  return <Profile pic={picture} user={user} post={post} />;
};
